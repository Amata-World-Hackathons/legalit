import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HashConnect, HashConnectTypes } from "hashconnect";
import { Preloader } from "@src/components/progress/Preloader";
import { HashConnectProvider } from "hashconnect/dist/provider/provider";
import { hethers } from "@hashgraph/hethers";
import { HashConnectSigner } from "hashconnect/dist/provider/signer";
import { HashConnectConnectionState } from "hashconnect/dist/types";
import { Client } from "@hashgraph/sdk";

const APP_METADATA: HashConnectTypes.AppMetadata = {
  name: "LegalIt",
  description: "True IP freedom",
  icon: "https://amata-world-hackathons.github.io/legalit/legalit-logo.jpg",
};

hethers.providers.getDefaultProvider();

export interface WalletContextValue {
  signer?: HashConnectSigner;
  provider?: HashConnectProvider;
  walletAddress?: string;
  client: Client;
  connect?: () => Promise<unknown>;
  disconnect?: () => void;
}

const WalletContext = React.createContext<WalletContextValue>({});

export const WALLET_CONFIG_KEY = "config/connection";

interface WalletSessionConfig {
  key?: string;
  topic?: string;
  state?: HashConnectTypes.ConnectionState;
  walletAddress?: string;
  pairingMetadata?: HashConnectTypes.WalletMetadata;
}
const hashconnect = new HashConnect();
const WALLET_SESSION = initSession();
const client = Client.forTestnet();

hashconnect.connectionStatusChange.on((event) => {
  console.log("connect event", event);
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionConfig, setTempSessionConfig] = useState<WalletSessionConfig>(
    {}
  );

  const setSessionConfig = useCallback(
    (config?: WalletSessionConfig | null) => {
      if (config) {
        localStorage.setItem(WALLET_CONFIG_KEY, JSON.stringify(config));

        setTempSessionConfig(config);
      } else {
        localStorage.removeItem(WALLET_CONFIG_KEY);
        setTempSessionConfig({});
      }
    },
    []
  );

  const connect = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      if (!sessionConfig.state) {
        console.warn("tried to initialize pairing without connection ready");
        resolve(undefined);
        return;
      }

      if (sessionConfig.walletAddress) {
        console.warn(
          "attempted to connect an account when already connected, please disconnect first"
        );
        resolve(undefined);
        return;
      }

      let found = false;
      const listener = (walletMetadata: HashConnectTypes.WalletMetadata) => {
        found = true;

        console.log("Found a supported wallet", walletMetadata);

        const pairingString = hashconnect.generatePairingString(
          sessionConfig.state!,
          "testnet",
          false
        );

        hashconnect.pairingEvent.once((pairingData) => {
          console.log("PAIRED WITH ACCOUNT ID", pairingData.accountIds);
          const config = {
            ...sessionConfig,
            walletAddress: pairingData.accountIds[0],
            pairingMetadata: pairingData.metadata,
          };

          setSessionConfig(config);
          resolve(config);
        });

        console.log("PAIRING", sessionConfig.state);

        hashconnect.connectToLocalWallet(pairingString);
      };
      hashconnect.foundExtensionEvent.once(listener);

      hashconnect.findLocalWallets();

      setTimeout(() => {
        if (found) return;

        hashconnect.foundExtensionEvent.off(listener);

        console.error("Missing wallet extension");
        reject("Missing wallet extension");
      }, 3000);
    });
  }, [hashconnect, sessionConfig]);

  const value = useMemo(() => {
    if (!sessionConfig.walletAddress) return { client, connect };

    const provider = hashconnect.getProvider(
      "testnet",
      sessionConfig.topic!,
      sessionConfig.walletAddress
    );
    const signer = hashconnect.getSigner(provider);

    // provider
    //   .getAccountBalance(sessionConfig.walletAddress)
    //   .then((accountInfo) => {
    //     console.log("ACC INFO", accountInfo);
    //   });

    return {
      client,
      walletAddress: sessionConfig.walletAddress,
      provider,
      signer,
      disconnect: () => {
        setSessionConfig(null);
        setTimeout(() => {
          initSession().then((val) => setSessionConfig(val));
        }, 500);
      },
    };
  }, [sessionConfig, connect]);

  useEffect(() => {
    WALLET_SESSION.then((val) => setSessionConfig(val));
  }, []);

  if (!sessionConfig.key) return <Preloader />;

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export function useWallet() {
  return useContext(WalletContext);
}

async function initSession(): Promise<WalletSessionConfig> {
  if (typeof window === "undefined") return {};

  return new Promise(async (resolve) => {
    const rawConfig = localStorage.getItem(WALLET_CONFIG_KEY);
    const initialConfig: WalletSessionConfig = rawConfig
      ? JSON.parse(rawConfig)
      : {};

    const connectPromise = new Promise((r) => {
      console.log("start");

      const listener = (state: HashConnectConnectionState) => {
        console.log("change", state);
        if (state === "Connected") {
          r(undefined);
          hashconnect.connectionStatusChange.off(listener);
        }
      };

      hashconnect.connectionStatusChange.on(listener);
    });

    if (initialConfig.key) {
      console.log("INIT", initialConfig);
      await hashconnect.init(APP_METADATA, initialConfig.key);

      const state = await hashconnect.connect(
        initialConfig.topic,
        initialConfig.pairingMetadata
      );

      connectPromise.then(() =>
        resolve({
          key: initialConfig.key,
          state,
          topic: state.topic,
          walletAddress: initialConfig.walletAddress,
          pairingMetadata: initialConfig.pairingMetadata,
        })
      );
      return;
    } else {
      const { privKey } = await hashconnect.init(APP_METADATA);
      const state = await hashconnect.connect();

      connectPromise.then(() =>
        resolve({ key: privKey, state, topic: state.topic })
      );
    }
  });
}

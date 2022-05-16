import React, { useCallback, useContext, useEffect, useState } from "react";
import { HashConnect, HashConnectTypes } from "hashconnect";
import { Preloader } from "@src/components/progress/Preloader";

const APP_METADATA: HashConnectTypes.AppMetadata = {
  name: "LegalIt",
  description: "True IP freedom",
  icon: "https://amata-world-hackathons.github.io/legalit/legalit-logo.jpg",
};

export interface WalletContextValue {
  wallet?: string;
  connect: () => void;
}

const WalletContext = React.createContext<WalletContextValue>({
  connect: () => {},
});

export const WALLET_CONFIG_KEY = "config/connection";

interface WalletSessionConfig {
  key?: string;
  topic?: string;
  state?: HashConnectTypes.ConnectionState;
  pairingData?: string;
}
const hashconnect = new HashConnect();
const WALLET_SESSION = initSession();

hashconnect.foundExtensionEvent.on((walletMetadata) => {
  console.log("WALLET FOUND", walletMetadata);
});

hashconnect.pairingEvent.on((pairingData) => {
  console.log("PAIRING DATA", pairingData);
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionConfig, setTempSessionConfig] = useState<WalletSessionConfig>(
    {}
  );

  const setSessionConfig = useCallback((config: WalletSessionConfig) => {
    console.log("NEW STATE", config);
    localStorage.setItem(WALLET_CONFIG_KEY, JSON.stringify(config));
    setTempSessionConfig(config);
  }, []);

  const connect = useCallback(async () => {
    if (!sessionConfig.state) {
      console.warn("tried to initialize pairing without connection ready");
      return;
    }

    const pairingString = hashconnect.generatePairingString(
      sessionConfig.state,
      "testnet",
      false
    );

    hashconnect.findLocalWallets();
    hashconnect.connectToLocalWallet(pairingString);

    setSessionConfig({
      ...sessionConfig,
      pairingData: pairingString,
    });

    console.log("SS", pairingString);
  }, [hashconnect, sessionConfig]);

  useEffect(() => {
    console.log("CONNECT");
    WALLET_SESSION.then((val) => setSessionConfig(val));
  }, []);

  if (!sessionConfig.key) return <Preloader />;

  return (
    <WalletContext.Provider value={{ connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  return useContext(WalletContext);
}

async function initSession(): Promise<WalletSessionConfig> {
  if (typeof window === "undefined") return {};

  const rawConfig = localStorage.getItem(WALLET_CONFIG_KEY);
  const initialConfig: WalletSessionConfig = rawConfig
    ? JSON.parse(rawConfig)
    : {};

  if (initialConfig.key) {
    await hashconnect.init(APP_METADATA, initialConfig.key);
    const state = initialConfig.topic
      ? await hashconnect.connect(initialConfig.topic)
      : await hashconnect.connect();

    return {
      key: initialConfig.key,
      state,
      topic: state.topic,
      pairingData: initialConfig.topic ? initialConfig.pairingData : undefined,
    };
  } else {
    const { privKey } = await hashconnect.init(APP_METADATA);
    const state = await hashconnect.connect();

    return { key: privKey, state, topic: state.topic };
  }
}

import "../globals.css";
import type { AppProps } from "next/app";
import { applyPublicPageLayout } from "@src/layouts/PublicPageLayout";
import { AppPage } from "@src/types";
import { AuthProvider } from "@src/contexts/Auth";
import { WalletProvider } from "@src/contexts/Wallet";

interface MyAppProps extends AppProps {
  Component: AppPage;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const applyLayout = Component.applyLayout || applyPublicPageLayout;

  return (
    <WalletProvider>
      <AuthProvider>{applyLayout(<Component {...pageProps} />)}</AuthProvider>
    </WalletProvider>
  );
}

export default MyApp;

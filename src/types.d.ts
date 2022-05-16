import { NextPage } from "next";

export type AppPage = NextPage & {
  applyLayout?: (page: React.ReactNode) => React.ReactElement;
};

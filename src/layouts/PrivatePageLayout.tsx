import React from "react";

import { PublicPageLayout } from "./PublicPageLayout";
import { MustAuthProvider } from "@src/contexts/Auth";

export const PrivatePageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MustAuthProvider>
      <PublicPageLayout>{children}</PublicPageLayout>
    </MustAuthProvider>
  );
};

export function applyPrivatePageLayout(page: React.ReactNode) {
  return <PrivatePageLayout>{page}</PrivatePageLayout>;
}

import Link from "next/link";
import { QRCode } from "react-qrcode-logo";
import { useRouter } from "next/router";

import { AppPage } from "@src/types";
import { applyPrivatePageLayout } from "@src/layouts/PrivatePageLayout";

export const ExportTagPage: AppPage = () => {
  const router = useRouter();
  const { chainId } = router.query as { chainId: string };

  const generatedLink = `https://${window.location.host}/chains/${chainId}`;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-16 prose dark:prose-invert">
        <h1>Export tag</h1>
      </div>

      <QRCode id="qr-code-preview" value={generatedLink} ecLevel="H" />

      <a
        href={generatedLink}
        target="_blank"
        rel="noreferrer nofollow"
        className="mt-4"
      >
        {generatedLink}
      </a>

      <div className="mt-8 flex flex-row justify-end">
        <Link href={`/chains/${chainId}`}>
          <a className="btn btn-ghost">Back to tag</a>
        </Link>

        <button className="ml-4 btn btn-primary">Export</button>
      </div>
    </div>
  );
};

ExportTagPage.applyLayout = applyPrivatePageLayout;

export default ExportTagPage;

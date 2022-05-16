import { Preloader } from "@src/components/progress/Preloader";
import { useFirestoreDocument } from "@src/contexts/Firebase";
import { AddLendableToListButton } from "@src/components/AddLendableToListButton";
import { AppPage } from "@src/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { COLLECTION_LENDABLES } from "@src/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const PropertyDetailPage: AppPage = () => {
  const router = useRouter();
  const { lendableId } = router.query as { lendableId: string };
  const [legalTemplateId, setLegalTemplateId] = useState("");

  const result = useFirestoreDocument(COLLECTION_LENDABLES, lendableId);
  const legalTemplateResult = useFirestoreDocument(
    "templates",
    legalTemplateId
  );

  useEffect(() => {
    const lendable = result.data;

    setLegalTemplateId(lendable?.legalTemplateId || "");
  }, [result]);

  if (result.loading) return <Preloader />;

  const lendable = result.data!;

  return (
    <div className="w-full max-w-3xl m-auto">
      <Head>
        <title>{lendable.name} | lendable</title>
      </Head>

      <section className="prose dark:prose-invert">
        <h1>{lendable.name}</h1>

        {lendable.marketplaceImageUrl ? (
          <img
            src={lendable.marketplaceImageUrl}
            alt={`Image of ${lendable.name}`}
            className="m-auto my-8"
          />
        ) : null}

        <a href={lendable.contentUrl} target="_blank" rel="noreferrer nofollow">
          {lendable.contentUrl}
        </a>

        {lendable.textContent ? (
          <ReactMarkdown className="p-4 border border-primary rounded-lg">
            {lendable.textContent}
          </ReactMarkdown>
        ) : null}

        {lendable.description ? <p>{lendable.description}</p> : null}
      </section>

      <section className="mt-8 w-full max-w-3xl prose dark:prose-invert p-8 border border-secondary rounded-lg">
        <h3>Monetization</h3>

        {lendable.monetizationOption === "singlePayment" ? (
          <p>
            One time payment of <code>{lendable.oneTimeFee}</code>
            <span className="kbd kbd-xs">NEO</span>
          </p>
        ) : (
          <p>
            Monthly fee of <code>{lendable.subscriptionFee}</code>
            <span className="kbd kbd-xs">NEO</span>
          </p>
        )}
      </section>

      <section className="mt-8 w-full max-w-3xl prose dark:prose-invert p-8 border border-accent rounded-lg">
        <h3>Usage</h3>

        <p>
          Terms according to {legalTemplateResult.data?.displayName}. You can
          find the full terms{" "}
          <Link
            href={`/templates/${legalTemplateResult.data?.legalTemplateId}`}
          >
            <a>here</a>
          </Link>
          .
        </p>
      </section>

      <div className="mt-16 flex flex-row justify-end">
        <AddLendableToListButton lendableId={lendable.id} />
      </div>
    </div>
  );
};

export default PropertyDetailPage;

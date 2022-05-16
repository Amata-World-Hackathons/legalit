import { Preloader } from "@src/components/progress/Preloader";
import {
  COLLECTION_CHAINS,
  COLLECTION_LENDABLES,
  PLACEHOLDER_IMAGE_SRC,
} from "@src/constants";
import { useAuth } from "@src/contexts/Auth";
import {
  useFirestoreCollection,
  useFirestoreDocument,
} from "@src/contexts/Firebase";
import { AppPage } from "@src/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export const ChainDetailpage: AppPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { chainId } = router.query as { chainId: string };

  const result = useFirestoreDocument(COLLECTION_CHAINS, chainId);
  const lendablesResult = useFirestoreCollection(COLLECTION_LENDABLES);

  if (result.loading) return <Preloader />;

  const chain = result.data!;

  const lendables = chain.lendables
    .map((lendable: any) => {
      return lendablesResult.data?.find((l) => l.id === lendable.ipChainId);
    })
    .filter((a: any) => a);

  return (
    <div className="w-full max-w-3xl m-auto">
      <Head>
        <title>{chain.name} | chain</title>
      </Head>

      <section className="prose dark:prose-invert">
        <h1>{chain.name}</h1>

        {chain.storefrontImageUrl ? (
          <img
            src={chain.storefrontImageUrl || PLACEHOLDER_IMAGE_SRC}
            alt={`Image of ${chain.name}`}
            className="m-auto my-8"
          />
        ) : null}

        <a href={chain.contentUrl} target="_blank" rel="noreferrer nofollow">
          {chain.contentUrl}
        </a>

        {chain.description ? <p>{chain.description}</p> : null}
      </section>

      <section className="mt-8 w-full max-w-3xl p-4 border border-primary rounded-lg">
        <div className="prose dark:prose-invert">
          <h3>Lendables used</h3>
        </div>

        {chain.lendables.length === 0 ? (
          <p>No lendables were used</p>
        ) : (
          <ul className="p-2">
            {lendables.map((lendable: any) => (
              <li key={lendable.id}>
                <Link href={`/lendables/${lendable.id}`}>
                  <a className="link link-primary">{lendable.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-16 flex flex-row justify-end">
        {user?.uid === chain.userId ? (
          <Link href={`/chains/${chainId}/export`}>
            <a className="btn btn-primary">Get QR code</a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ChainDetailpage;

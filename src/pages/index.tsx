import { AppPage } from "@src/types";
import { useFirestoreCollection } from "@src/contexts/Firebase";
import { Preloader } from "@src/components/progress/Preloader";
import Link from "next/link";
import Head from "next/head";
import { COLLECTION_CHAINS, PLACEHOLDER_IMAGE_SRC } from "@src/constants";

import styles from "@src/utils.module.css";

export const Home: AppPage = () => {
  const result = useFirestoreCollection(COLLECTION_CHAINS);

  if (result.loading) return <Preloader />;

  const chains = result.data!;

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>All contracts</title>
      </Head>

      <div className="prose dark:prose-invert">
        <h1>Contracts</h1>
      </div>

      <div className="mt-8 flex flex-row flex-wrap max-w-6xl justify-around">
        {chains.map((chain) => (
          <div key={chain.id} className="card w-80 mx-4 my-4 rounded-sm">
            <figure>
              <img
                src={chain.storefrontImageUrl || PLACEHOLDER_IMAGE_SRC}
                alt={`Storefront image for ${chain.name}`}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                <Link href={`/contracts/${chain.id}`}>
                  <a className="hover:underline">{chain.name}</a>
                </Link>
              </h2>
              <p className={styles["long-text-preview"]}>
                {chain.description || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border border-primary mt-16 rounded-sm w-full max-w-3xl flex flex-row justify-end">
        <Link href="/contracts/new">
          <a className="btn btn-ghost">New Contract</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;

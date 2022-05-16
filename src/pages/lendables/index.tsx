import { AppPage } from "@src/types";
import { useFirestoreCollection } from "@src/contexts/Firebase";
import { Preloader } from "@src/components/progress/Preloader";
import Link from "next/link";
import Head from "next/head";
import { AddLendableToListButton } from "@src/components/AddLendableToListButton";
import { COLLECTION_LENDABLES } from "@src/constants";

import styles from "@src/utils.module.css";

export const LendablesIndexPage: AppPage = () => {
  const result = useFirestoreCollection(COLLECTION_LENDABLES);

  if (result.loading) return <Preloader />;

  const lendables = result.data!;

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>All tags</title>
      </Head>

      <div className="prose dark:prose-invert">
        <h1>All Lendables</h1>
      </div>

      <div className="mt-8 flex flex-row flex-wrap max-w-6xl justify-around">
        {lendables.map((lendable) => (
          <div
            key={lendable.id}
            className="card w-80 mx-4 my-4 border border-primary"
          >
            <figure>
              <img
                src={
                  lendable.marketplaceImageUrl ||
                  "https://via.placeholder.com/300x300/000000/FFFFFF?text=Image+not+available"
                }
                alt={`Storefront image for ${lendable.name}`}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                <Link href={`/lendables/${lendable.id}`}>
                  <a className="hover:underline">{lendable.name}</a>
                </Link>
              </h2>
              <p className={styles["long-text-preview"]}>
                {lendable.description || "N/A"}
              </p>

              <div className="card-actions justify-end">
                <AddLendableToListButton lendableId={lendable.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border border-primary mt-16 rounded-lg">
        <Link href="/lendables/new">
          <a className="btn btn-ghost">New lendable</a>
        </Link>
      </div>
    </div>
  );
};

export default LendablesIndexPage;

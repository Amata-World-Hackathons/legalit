import Link from "next/link";

import { applyPrivatePageLayout } from "@src/layouts/PrivatePageLayout";
import { AppPage } from "@src/types";
import { useFirestoreCollection } from "@src/contexts/Firebase";
import { COLLECTION_CHAINS, COLLECTION_LENDABLES } from "@src/constants";
import { useMustAuth } from "@src/contexts/Auth";

export const DashboardPage: AppPage = () => {
  const { user } = useMustAuth();
  const chainsResult = useFirestoreCollection(COLLECTION_CHAINS);
  const lendablesResult = useFirestoreCollection(COLLECTION_LENDABLES);

  const yourChains = (chainsResult.data || []).filter((chain) => {
    return chain.userId === user.uid;
  });
  const yourLendables = (lendablesResult.data || []).filter((lendable) => {
    return lendable.userId === user.uid;
  });

  return (
    <div className="flex flex-col items-center">
      <section className="mt-8 w-full max-w-3xl p-4 border border-primary rounded-lg">
        <div className="prose dark:prose-invert">
          <h2>Your IP Chains</h2>
        </div>

        {yourChains.length > 0 ? (
          <ul className="mt-4 p-4 bg-white">
            {yourChains.map((chain) => (
              <li key={chain.id} className="">
                <Link href={`/chains/${chain.id}`}>
                  <a>{chain.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-row justify-end">
          <Link href="/chains/new">
            <a className="btn btn-primary">New IP Chain</a>
          </Link>
        </div>
      </section>

      <section className="mt-16 w-full max-w-3xl p-4 border border-primary rounded-lg">
        <div className="prose dark:prose-invert">
          <h2>Your lendables</h2>
        </div>

        {yourLendables.length > 0 ? (
          <ul className="mt-4 p-4 bg-white">
            {yourLendables.map((lendable) => (
              <li key={lendable.id} className="">
                <Link href={`/lendables/${lendable.id}`}>
                  <a>{lendable.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-row justify-end">
          <Link href="/lendables/new">
            <a className="btn btn-primary">New lendable</a>
          </Link>
        </div>
      </section>
    </div>
  );
};

DashboardPage.applyLayout = applyPrivatePageLayout;

export default DashboardPage;

import Link from "next/link";

import { AppPage } from "@src/types";

export const NotFoundPage: AppPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-50">
      <section className="prose">
        <h1>You have discovered the Abyss</h1>
        <p>
          It is not safe here, quickly{" "}
          <Link href="/">
            <a className="link link-accent">return to safety</a>
          </Link>
        </p>
      </section>
    </div>
  );
};

NotFoundPage.applyLayout = (page) => page as any;

export default NotFoundPage;

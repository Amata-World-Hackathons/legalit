import { useAuth } from "@src/contexts/Auth";
import classNames from "classnames";
import Link from "next/link";

export const PublicDashboardButton: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ className, ...rest }) => {
  const { user, showAuthModal } = useAuth();

  return user ? (
    <Link href="/dashboard">
      <a {...rest} className={classNames("btn btn-ghost", className)}>
        Dashboard
      </a>
    </Link>
  ) : (
    <button className="btn btn-ghost" onClick={showAuthModal}>
      Signup
    </button>
  );
};

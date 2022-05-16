import { useAuth } from "@src/contexts/Auth";
import { useFirestore } from "@src/contexts/Firebase";
import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import { useCallback } from "react";

export interface AddLendableToListButtonProps {
  lendableId: string;
}

export const AddLendableToListButton: React.FC<
  AddLendableToListButtonProps
> = ({ lendableId }) => {
  const db = useFirestore();
  const { user, profile, showAuthModal, refetchProfile } = useAuth();

  const onClick = useCallback(() => {
    if (!user) {
      showAuthModal!();
    } else if (profile) {
      const saved = (profile.saved || []).includes(lendableId)
        ? profile.saved.filter((a) => a !== lendableId)
        : (profile.saved || []).concat(lendableId);

      setDoc(doc(db, "profiles", user!.uid), {
        ...profile,
        saved,
      }).then(refetchProfile);
    }
  }, [showAuthModal, user, lendableId, db, profile, refetchProfile]);

  const isSaved = profile?.saved?.includes(lendableId);

  return (
    <button
      className={classNames("btn", {
        "btn-primary": !isSaved,
        "btn-secondary": isSaved,
      })}
      onClick={onClick}
    >
      {isSaved ? (
        <span className="material-icons mr-2">check_circle</span>
      ) : null}
      {isSaved ? "Saved" : "Save to list"}
    </button>
  );
};

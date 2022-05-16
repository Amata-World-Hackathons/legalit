import classnames from "classnames";
import { useEffect, useRef } from "react";

import { legacyApp, legacyFirebase } from "@src/contexts/Firebase";

export interface AuthModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

const authUI =
  typeof window !== "undefined"
    ? new (require("firebaseui") as any).auth.AuthUI(
        legacyFirebase.auth(legacyApp)
      )
    : (null as any);

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const onCloseRef = useRef(onClose);
  const uiLocationRef = useRef(null);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        onCloseRef.current();
        return false;
      }
    };
    window.addEventListener("keydown", listener);

    if (uiLocationRef.current) {
      authUI.start(uiLocationRef.current, {
        signInSuccessUrl: `${
          process.env.NEXT_PUBLIC_BASE_PATH || ""
        }/account/profile`,
        signInOptions: [
          legacyFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
          legacyFirebase.auth.EmailAuthProvider.PROVIDER_ID,
          //   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        tosUrl: "",
        privacyPolicyUrl: "",
      });
    }
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  return (
    <div
      className={classnames(
        "fixed top-0 bottom-0 left-0 right-0 transition-opacity duration-300 bg-slate-800 z-50 flex flex-col justify-center items-center",
        {
          "opacity-0 pointer-events-none": !isOpen,
          "opacity-90 pointer-events-auto": isOpen,
        }
      )}
      onClick={() => onClose()}
    >
      <div
        className="w-xl relative bg-slate-300 shadow-md shadow-cyan-600 p-8 border-2 border-cyan-600"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Login to continue</h2>

        <div ref={uiLocationRef} className="m-4"></div>
        <span>
          Powered by{" "}
          <a
            href="https://firebase.google.com/"
            target="_blank"
            rel="noreferrer nofollow"
          >
            Firebase
          </a>
        </span>
      </div>
    </div>
  );
};

export default AuthModal;

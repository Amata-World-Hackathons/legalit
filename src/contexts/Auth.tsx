import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth, useFirestoreDocument } from "./Firebase";
import AuthModal from "@src/components/auth/AuthModal";
import { useRouter } from "next/router";
import { Preloader } from "@src/components/progress/Preloader";

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

const logout = () =>
  signOut(firebaseAuth).then(() => {
    localStorage.clear();
    window.location.reload();
  });

interface Profile {
  bio: string;
  saved: string[];
  imageUrl: string;
  legalName: string;
  displayName: string;
  isComplete: boolean;
}

export interface AuthResult {
  user?: User;
  loading: boolean;
  error?: string;
  profile?: Profile;
  signup?: (email: string, password: string) => Promise<unknown>;
  login?: (email: string, password: string) => Promise<unknown>;
  logout: () => Promise<void>;
  refetchProfile?: () => void;
  showAuthModal?: () => void;
}

const AuthContext = React.createContext<AuthResult>({
  loading: true,
  logout,
});

const MustAuthContext = React.createContext<{
  user: User;
  profile: Profile;
}>({} as any);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [result, setResult] = useState<AuthResult>({ loading: true, logout });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: profile, refetch } = useFirestoreDocument(
    "profiles",
    result.user?.uid || ""
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setResult({
        user: user ? user : undefined,
        loading: false,
        signup: user ? undefined : signup,
        login: user ? undefined : login,
        logout,
        showAuthModal: user ? undefined : () => setShowAuthModal(true),
      });
    });

    setResult({ loading: false, signup, login, logout });

    return () => unsubscribe();
  }, [setShowAuthModal]);

  const value = useMemo(() => {
    return {
      ...result,
      profile: profile
        ? ({
            ...(profile as unknown as Profile),
            isComplete: isProfileComplete(profile as unknown as Profile),
          } as Profile)
        : undefined,
      refetchProfile: refetch,
    };
  }, [result, profile, refetch]);

  return (
    <AuthContext.Provider value={value}>
      {children}

      {showAuthModal ? (
        <AuthModal isOpen onClose={() => setShowAuthModal(false)} />
      ) : null}
    </AuthContext.Provider>
  );
};

export function useMustAuth() {
  return useContext(MustAuthContext);
}

export function useFirebaseAuth() {
  return firebaseAuth;
}

export function useAuth() {
  return useContext(AuthContext);
}

export interface MustAuthProviderProps {
  children: React.ReactElement;
}

export const MustAuthProvider: React.FC<MustAuthProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  const { data: profile, loading: profileLoading } = useFirestoreDocument(
    "profiles",
    user?.uid || ""
  );

  useEffect(() => {
    setTimeout(() => setMounted(true), 500);
  }, []);

  useEffect(() => {
    if (mounted && !user && !loading) {
      router.push("/");
    }
  }, [mounted, router, user, loading]);

  if (!mounted || loading || profileLoading) return <Preloader />;

  return (
    <MustAuthContext.Provider value={{ user: user!, profile: profile! as any }}>
      {children}
    </MustAuthContext.Provider>
  );
};

export function isProfileComplete(profile?: Partial<Profile>): boolean {
  return !!profile?.legalName;
}

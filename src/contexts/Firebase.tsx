// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import legacyFirebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export { default as legacyFirebase } from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtAiyg971QlDyip5WB8bpSnMihXhbft1k",
  authDomain: "ip-chain.firebaseapp.com",
  projectId: "ip-chain",
  storageBucket: "ip-chain.appspot.com",
  messagingSenderId: "654335862878",
  appId: "1:654335862878:web:24a1f64f2193421b552ccf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const firebaseAuth = getAuth();

export const legacyApp = legacyFirebase.initializeApp(firebaseConfig);

export function useFirestore() {
  return db;
}

export interface AsyncResult<T> {
  data?: T;
  error?: string;
  loading: boolean;
  refetch: () => void;
}

export interface FirestoreData extends DocumentData {
  id: string;
}

export function useFirestoreDocument(collection: string, docId: string) {
  const db = useFirestore();
  const [version, setVersion] = useState(0);
  const refetch = useCallback(() => setVersion(version + 1), [version]);
  const [result, setResult] = useState<AsyncResult<FirestoreData>>({
    refetch,
    loading: true,
  });

  useEffect(() => {
    if (!docId) return;

    setResult({ refetch, loading: true });

    getDoc(doc(db, collection, docId)).then((snapshot) => {
      if (snapshot.exists()) {
        setResult({
          refetch,
          data: { ...snapshot.data(), id: snapshot.id },
          loading: false,
        });
      } else {
        setResult({
          refetch,
          loading: false,
          error: "not found",
        });
      }
    });
  }, [db, collection, docId, refetch]);

  return result;
}

export function useFirestoreCollection(collectionName: string) {
  const db = useFirestore();
  const [version, setVersion] = useState(0);
  const refetch = useCallback(() => setVersion(version + 1), [version]);
  const [result, setResult] = useState<AsyncResult<FirestoreData[]>>({
    refetch,
    loading: true,
  });

  useEffect(() => {
    setResult({ refetch, loading: true });

    getDocs(query(collection(db, collectionName))).then(
      (snapshot) => {
        const res: FirestoreData[] = [];
        snapshot.forEach((s) => res.push({ ...s.data(), id: s.id }));

        setResult({
          data: res,
          refetch,
          loading: false,
        });
      },
      (err) => setResult({ refetch, loading: false, error: err.toString() })
    );
  }, [db, collectionName, refetch]);

  return result;
}

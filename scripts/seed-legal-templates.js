const fs = require("fs");
const { initializeApp } = require("firebase/app");
const { setDoc, doc, getFirestore } = require("firebase/firestore");

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

const simpleMd = fs.readFileSync(`${__dirname}/templates/simple.md`);
const strictMd = fs.readFileSync(`${__dirname}/templates/strict.md`);

setDoc(doc(db, "templates", "simple"), {
  updated: new Date().toISOString(),
  contents: simpleMd.toString(),
  displayName: "Simple",
});

setDoc(doc(db, "templates", "strict"), {
  updated: new Date().toISOString(),
  contents: strictMd.toString(),
  displayName: "Strict",
});

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// This is our configuration. It tells our code that this is the Firebase project that we want to connect to. We're passing this configuration into initializeApp(), and it returns the firebase application we have on the cloud.
const firebaseConfig = {
  apiKey: "AIzaSyC9u7zfjqU6fIQB9A0cqDsgdSR1zWHGRN8",
  authDomain: "instagram-clone-9dc39.firebaseapp.com",
  projectId: "instagram-clone-9dc39",
  storageBucket: "instagram-clone-9dc39.appspot.com",
  messagingSenderId: "335880814708",
  appId: "1:335880814708:web:e34921c6e79ddb0ba69121",
  measurementId: "G-37JN7PFP73",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

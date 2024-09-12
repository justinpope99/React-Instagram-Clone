import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// This is our configuration. It tells our code that this is the Firebase project that we want to connect to. We're passing this configuration into initializeApp(), and it returns the firebase application we have on the cloud.
const firebaseConfig = {
  apiKey: "AIzaSyAaocl1E7H1rM2Wq4_iFVA8dU0zTwz20eo",
  authDomain: "justin-instagram-clone.firebaseapp.com",
  projectId: "justin-instagram-clone",
  storageBucket: "justin-instagram-clone.appspot.com",
  messagingSenderId: "279137016961",
  appId: "1:279137016961:web:0e5e843c22da439da2c180",
  measurementId: "G-R2VP7Q5YWT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase.js";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    // We will check if a user already exists with a username. To do this, we will use a query.
    // This is a reference to the "users" collection in Firebase.
    const usersRef = collection(firestore, "users");

    // This query will check to see if a username has already been used.
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    // If this user exists, show a toast with an error
    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      // If this is successful, it will return the new user.
      // This function only checks if the email exist, it doesn't check if the username has already been used.
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        // @ts-ignore
        showToast("Error", error.message, "error");
        return;
      }
      // The user must be created in Firebase Authentication system and have a document in Firestore
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        // We need to create this user document in our Firestore
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        // We will set this in our local storage as well
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase.js";
import useShowToast from "./useShowToast.js";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore.js";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    // We're checking if the email and password are filled in.
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }
    try {
      // We're checking if the email and password are correct.
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        // Here, we are fetching a document
        // We need to pass in our database, collection, and user credentials
        const docRef = doc(firestore, "users", userCred.user.uid);
        // We are getting the document and passing the reference, this will get us the user that is logged in
        const docSnap = await getDoc(docRef);
        // docSnap.data() will get us all the fields of the user
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        // This will update our user interface
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;

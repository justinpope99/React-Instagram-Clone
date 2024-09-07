import { auth } from "../firebase/firebase.js";
import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut();
      // Remove user-info from local storage so that our application knows this user has logged our
      localStorage.removeItem("user-info");
      // Next, we will navigate our user to the Auth Page
      logoutUser();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { handleLogout, isLoggingOut, error };
};

export default useLogout;

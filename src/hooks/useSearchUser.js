import { useState } from "react";
import useShowToast from "./useShowToast.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  // This is the state for the searched user
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null); // We'll reset the state of the searched user
    // We will use a query to implement search functionality
    try {
      // Query the database
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      // Wait for a result from the query
      const querySnapshot = await getDocs(q);
      // If the query is empty, that means the user was not found
      if (querySnapshot.empty)
        return showToast("Error", "User not found", "error");
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;

import { useEffect, useState } from "react";
import useShowToast from "./useShowToast.js";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true); // This will run immediately
  const [userProfile, setUserProfile] = useState(null); // This may be empty intially

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId]); // This useEffect should run whenever the userId changes

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;

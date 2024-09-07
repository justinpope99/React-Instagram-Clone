import { useEffect, useState } from "react";
import useShowToast from "./useShowToast.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";
import useUserProfileStore from "../store/userProfileStore.js";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true); // This is true by default as it is running immediately
  const showToast = useShowToast();

  const { userProfile, setUserProfile } = useUserProfileStore();
  // const userProfile = useUserProfileStore(state => state.userProfile)

  // We are initializing this for on mount initially. This will get the user profile by the username
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
        // querySnapshot.empty means the user is not found
        if (querySnapshot.empty) return setUserProfile(null);

        let userDoc;
        // There will just be 1 document, but we're still using forEach because it's in the form of an array
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
        console.log(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;

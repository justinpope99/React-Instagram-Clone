import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useGetSuggestedUsers = () => {
  // This hook will immediately run whenever we call it
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    // We will use a query to get suggested users
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          // We don't want to suggest ourselves in the Suggested Users Component, or the users that the user already follows.
          // We'll spread authUser.following so that we get the elements one-by-one, and not a nested array.
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3) // We only want to suggest 3 users
        );

        // We will execute this query with getDocs() which will give us a query snapshot
        const querySnapshot = await getDocs(q);
        // We'll create an array to store the suggested users
        const users = [];
        // We will use a forEach loop to push the users to our users array

        querySnapshot.forEach((doc) => {
          // Since we are pushing into an array, we create an object with spreading the doc.data(),
          // creating an id, getting that id from this document so that you won't get key errors in
          // React when using the map() method
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    // We will call this function only if the authUser exists
    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;

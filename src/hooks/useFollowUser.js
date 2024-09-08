import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore.js";
import useUserProfileStore from "../store/userProfileStore.js";
import useShowToast from "./useShowToast.js";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

// The userId parameter is the user that we are following or unfollowing
const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      // Let's get both user ids, as the followers/following arrays will contain user ids
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      // Now, we'll update both documents. Pass in the reference and the object, and data to update
      await updateDoc(currentUserRef, {
        // If authUser is following, then unfollow by removing the Id by using 2 functions from Firebase
        // arrayRemove will remove the userId from the array, and arrayUnion will add the userId into the array
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      // Now, we need to update our states, since the database is updated.
      // If the user is following, we'll update the states to be unfollow.
      if (isFollowing) {
        // Unfollow
        setAuthUser({
          ...authUser,
          // Check each id in following to see if it's equal to the userId. We'll remove the id that matches.
          following: authUser.following.filter((uid) => uid !== userId),
        });
        setUserProfile({
          ...userProfile,
          // We're removing the id of the authUser
          followers: userProfile.followers.filter(
            (uid) => uid !== authUser.uid
          ),
        });
        // Lastly, we'll update the local storage to keep everything in sync
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );

        setIsFollowing(false);
      } else {
        // Follow
        // This is similar to Unfollow, but instead of filtering the arrays, we'll be adding to them
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId],
        });
        setUserProfile({
          ...userProfile,
          following: [...userProfile.following, authUser.userId],
        });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );

        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // We will use useEffect to initialize this on the first render
  useEffect(() => {
    if (authUser) {
      // If the auth user's array of followed users includes this user, then we are already following this user
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]); // This useEffect will run whenever the authUser of userId changes

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;

import { useEffect, useState } from "react";
import usePostStore from "../store/postStore.js";
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";
import useUserProfileStore from "../store/userProfileStore.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      // This query will give us the posts of the user that we follow
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        // We want these to be in descending order, so we will sort these posts by the createdAt field.
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    // We'll call this function only if the authUser exists
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;

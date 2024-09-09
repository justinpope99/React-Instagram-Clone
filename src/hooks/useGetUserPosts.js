import { useEffect, useState } from "react";
import usePostStore from "../store/postStore.js";
import useShowToast from "./useShowToast.js";
import useUserProfileStore from "../store/userProfileStore.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useGetUserPosts = () => {
  // This will be true initially as it will run immediately within a useEffect
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  // We'll get the userProfile since we'll be updating it
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return; // We cannot fetch the posts, if the user's profile doesn't exist
      setIsLoading(true);
      setPosts([]);

      try {
        // We'll use a query to get the posts of the user
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        // We'll call the query
        const querySnapshot = await getDocs(q);

        // Store the user's post into an array
        const posts = [];
        // Push all the posts from the database into the user's posts array
        querySnapshot.forEach((doc) => {
          // We're including an id so that incase we want to use the map() function, we'll have a key
          posts.push({ ...doc.data(), id: doc.id });
        });
        // We'll sort the array so the latest post is at the top
        posts.sort((a, b) => b.createdAt - a.createdAt); // Descending order
        setPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;

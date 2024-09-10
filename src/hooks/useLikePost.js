import { useState } from "react";
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  // We'll check to see if the user has liked the post. Include a ? incase the user is not authenticated
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    setIsUpdating(true);

    try {
      // We'll update the document's likes count
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        // If the user liked the post previously, remove them from the post's likes, if they have not liked the
        // post, then add them to the likes array.
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      // Negate the liked state after liking
      setIsLiked(!isLiked);
      // If the post is liked, the number of likes will be decremented. If it's liked, increment the likes by 1.
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;

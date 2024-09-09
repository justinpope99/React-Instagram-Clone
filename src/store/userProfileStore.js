import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  // userProfile is the state value
  userProfile: null, // This can be null, because we're not visiting any user profile initially
  // setUserProfile is the setter function
  setUserProfile: (userProfile) => set({ userProfile }),
  /* addPost:(): This function will get the post, and call the setter function, which takes the state as the first
  value, which is userProfile. Then, we are going to return an object.  */
  // This is used to update the number of posts in the profile page
  addPost: (post) =>
    set((state) => ({
      // The userProfile state will be spreading all the previous state. For the post, we'll just add the newly
      // created post id, and spread the previous posts.
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  // This will update the Profile Header when a user deletes a post
  deletePost: (postId) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile, // We will only update the posts array, everything else is the same
        posts: state.userProfile.posts.filter((id) => id !== postId), // Remove the selected post
      },
    })),
}));

export default useUserProfileStore;

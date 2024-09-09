import { create } from "zustand";

const usePostStore = create((set) => ({
  // Our posts store will be empty initially
  posts: [],
  // We'll have a createPost function that will add the newly created post into the array
  /* This function takes a post, then calls the setter function, which takes the previous state, and then returns an object. It updates the post by putting the latest post at the top, and spreading the other posts */
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  // Delete Post

  // Add Comment

  // Set Post
}));

export default usePostStore;

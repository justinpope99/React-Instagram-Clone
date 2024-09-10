import { create } from "zustand";

const usePostStore = create((set) => ({
  // Our posts store will be empty initially
  posts: [],
  // We'll have a createPost function that will add the newly created post into the array
  /* This function takes a post, then calls the setter function, which takes the previous state, and then returns an object. It updates the post by putting the latest post at the top, and spreading the other posts */
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  // Delete Post: This will take the id of the post, calls the setter function, gets the state, and returns an
  // object with the posts, but they will be filtered by the post id of the post that we are deleting
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),

  // Add Comment: We are sending the postId and comment
  addComment: (postId, comment) =>
    // We're mapping our state which is posts
    set((state) => ({
      // We're mapping all posts
      posts: state.posts.map((post) => {
        // Once we find the post where the user is commenting, we are updating the comments array with the new comment
        if (post.id === postId) {
          return {
            ...post,
            // We're putting the new comment at the end, because we want new comments to be at the bottom of the latest one.
            comments: [...post.comments, comment],
          };
        }
        // If this is not the post we're looking for, then we'll return that post as they were
        return post;
      }),
    })),
  // Set Post: This will take the new post an update our state with it
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;

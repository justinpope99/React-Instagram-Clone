import { create } from "zustand";

// How to use zustand: Call the create function, and put the setter function as the callback.
const useAuthStore = create((set) => ({
  // This must be wrapped in parentheses because it is an object, not a function body.
  //When you first open up the application, no user has been authenticated.
  user:
    // We have to check if "user-info" is undefined, and set user to null if it is, because there will be a JSON error if the user is undefined, but not if the user is null.
    localStorage.getItem("user-info") !== "undefined"
      ? JSON.parse(localStorage.getItem("user-info"))
      : null,
  // These are all functions that manipulate the state, which is "user".
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  // login and setUser do the same thing, we are separating them so that the code is more readable.
  setUser: (user) => set({ user }),
}));

export default useAuthStore;

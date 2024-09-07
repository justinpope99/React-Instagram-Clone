import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  // userProfile is the state value
  userProfile: null, // This can be null, because we're not visiting any user profile initially
  // setUserProfile is the setter function
  setUserProfile: (userProfile) => set({ userProfile }),
  // addPost:()
}));

export default useUserProfileStore;

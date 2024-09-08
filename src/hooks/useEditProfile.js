import { useState } from "react";
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore.js";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  // We're updating the user state
  const setAuthUser = useAuthStore((state) => state.setUser);
  // This will update the user profile
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  // This will take the inputs, and the selectedFile incase the user wants to update their profile picture
  const editProfile = async (inputs, selectedFile) => {
    // We are returning here, because we don't want the user to try to edit the profile again while the last updates are still being applied.
    if (isUpdating || !authUser) return;
    setIsUpdating(true);
    // We'll be uploading images to Firebase Storage using the Data URL string implementation
    // https://firebase.google.com/docs/storage/web/upload-files

    // These will be our references for the updates
    // We are uploading user profile pictures to profilePics to make our code more readable.
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      // We'll only update the profile picture if there is a selected file
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        // Once this picture has been uploaded, we'll retreive the URL of the image using getDownloadURL
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      // We're creating a new document for the updated user.
      const updatedUser = {
        // We don't want to override the other data outside of this, so we'll bring in the other values.
        ...authUser, // These values will be deleted if we don't bring them in
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      // This will update the user in Firebase using the new updated user object we created
      await updateDoc(userDocRef, updatedUser);
      // We'll also update this user in local storage
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      // We also need to update the authUser state
      setAuthUser(updatedUser);
      // We're updating the user profile as well so that every state is in sync. When we edit our profile, we are
      // in our own profile, so the user state should be in sync.
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;

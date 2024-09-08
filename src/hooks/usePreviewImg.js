/* This is common in React, you just create a hook like this, and call it whenever you want to render an image from
 your computer. We are making a hoot to make the code readable and reusable */
import { useState } from "react";
import useShowToast from "./useShowToast.js";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null); // This will be null as there is no selected file by default
  const showToast = useShowToast();
  // This hook will only allow a max size of 2MB for the image
  const maxFileSizeInBytes = 2 * 1024 * 1024; // This equals 2MB in bytes

  // Once you select an image, this function will run in the backgraund
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      // This will take an image file and convert it into a base 64 string, and then set it into the input
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null);
    }
  };

  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;

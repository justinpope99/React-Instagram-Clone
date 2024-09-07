import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      // signInWithGoogle() will work for both Signing up and Loggging in automatically
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // We will get a document to check if the user exists or not. This is because we want our code to know whether the user is logging in or signing up for the first time.
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Login
        const userDoc = userSnap.data();
        // We'll store userDoc in our local storage, as well as the authStore
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // Sign Up
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          // Username Template: For johndoe@gmail.com, username will be johndoe. This will be acheived using split().
          username: newUser.user.email.split("@")[0], // This will split the email at @ and return the first part
          fullName: newUser.user.displayName, // displayName is coming from Google
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        // We need to create this user document in our Firestore
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        // We will set this in our local storage as well
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="/public/google.png" w={5} alt="Google Logo" />
      <Text mx={2} color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;

import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants.jsx";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import usePostStore from "../../store/postStore.js";
import useUserProfileStore from "../../store/userProfileStore.js";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase.js";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // We'll store the caption in a state
  const [caption, setCaption] = useState("");
  // We'll create a reference to the select image input
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      // Once the post has been created, we should close the modal, and reset the selected file and caption
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            />
            {/* If the selected file exists, we will render this Flex */}
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected image" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

// This will be our hook for creating posts
function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);

  // This is our function to create a post. It will take the selected file and caption as arguments
  const handleCreatePost = async (selectedFile, caption) => {
    // If it is loading, and the user still tries to click the Post button, we will return out of this function
    // so that it doesn't overload our servers.
    if (isLoading) return;
    // The user will not be able to post without having an image
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      // First we need to create the post document. If the user has no posts, Firestore will create it.
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // We'll also add the post id into the user document
      const userDocRef = doc(firestore, "users", authUser.uid);
      // We're creating an image reference to upload the posts to Firebase in the posts folder
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      // Updating the user's posts array
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      // This will upload the image to Firebase
      await uploadString(imageRef, selectedFile, "data_url");
      // Now, we'll get the download URL
      const downloadURL = await getDownloadURL(imageRef);

      // This will update the posts array to include a download URL in Firestore
      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      // We'll update the posts in the Front-end, we'll also add an id, so we don't have any errors, when we render the posts. createPosts() will add the post into the post state.
      createPost({ ...newPost, id: postDocRef.id });
      // After we create a post, we need to update the UI. This will increment the Posts number in the Post Header
      addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}

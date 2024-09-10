import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "./Comment.jsx";
import usePostComment from "../../hooks/usePostComment.js";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  // We'll get the value of the comment by using a ref
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    // We don't want to refresh the page
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };

  // When a user comments, we want the scrollbar to automatically move down for them to see their new comment.
  // We will use a useEffect for this
  useEffect(() => {
    const scrollToBottom = () => {
      // This will make the scrollbar scroll to the very end of this container
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      // When this useEffect runs for the first time, the commentsContainerRef.current is null. This is because
      // of how React renders things. We will fix this by delaying the useEffect with a setTimeout().
      setTimeout(() => {
        scrollToBottom();
      }, 1000);
    }
    // This should run whenever the Modal opens or a new comment is posted
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            // This will allow us to scroll to the very bottom in this container once there is a new comment
            ref={commentsContainerRef}
          >
            {/* Later, we should add an id to each comment, for now, we'll use the index. */}
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
            <Input placeholder="Comment" size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;

import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";
import useGetUserProfileById from "../../hooks/useGetUserProfileById.js";

// We are using destructuring to get the values we need to create posts
const FeedPost = ({ post }) => {
  // This will give us the profile by that user
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"Feed post image"} />
      </Box>
      <PostFooter
        post={post}
        creatorProfile={userProfile}
        isProfilePage={undefined}
      />
    </>
  );
};

export default FeedPost;

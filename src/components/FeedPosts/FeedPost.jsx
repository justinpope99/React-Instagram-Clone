import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";

// We are using destructuring to get the values we need to create posts
const FeedPost = ({ img, username, avatar }) => {
  return (
    <>
      <PostHeader username={username} avatar={avatar} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt={username} />
      </Box>
      <PostFooter username={username} isProfilePage={undefined} />
    </>
  );
};

export default FeedPost;

import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";
import useGetFeedPosts from "../../hooks/useGetFeedPosts.js";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    // While it is loading, load the skeleton. Our skeleton will load 4 times when it's loading
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          // We will add a key with the index, so we don't get any errors from React
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb="10">
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length == 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"} textAlign={"center"}>
            You are not following any users.
          </Text>
          {<br />}
          <Text color={"red.400"} textAlign={"center"}>
            Start following some users to get their posts in your Home page!
          </Text>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;

import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost.jsx";
import useGetUserPosts from "../../hooks/useGetUserPosts.js";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();

  const noPostsFounds = !isLoading && posts.length === 0;
  if (noPostsFounds) return <NoPostsFound />;
  // We are using Grid so we can have 3 items at the same width, we will use fractions for this.
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box height={"300px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {/* If it is not loading, we'll map the posts, and show a component */}
      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found🤔</Text>
    </Flex>
  );
};

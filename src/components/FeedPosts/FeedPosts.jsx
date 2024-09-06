import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";
import { useEffect, useState } from "react";

const FeedPosts = () => {
  // Configuring the useState for the Skeleton
  const [isLoading, setIsLoading] = useState(true);

  // When you refresh the page, loading state will be true for 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {};
  }, []);

  return (
    // While it is loading, load the skeleton. Our skeleton will load 4 times when it's loading
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
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
              <Box h={"500px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          <FeedPost img="/img1.png" username="burakormezz" avatar="/img1.png" />
          <FeedPost img="/img2.png" username="josh" avatar="/img2.png" />
          <FeedPost img="/img3.png" username="janedoe" avatar="/img3.png" />
          <FeedPost img="/img4.png" username="johndoe" avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;

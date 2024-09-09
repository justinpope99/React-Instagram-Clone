import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader.jsx";
import SuggestedUser from "./SuggestedUser.jsx";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers.js";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  // We can choose to render a skeleton here
  if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See All
          </Text>
        </Flex>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.uid} setUser={undefined} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2023 Built By{" "}
        <Link
          href="https://github.com/justinpope99"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
        >
          Justin Pope
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;

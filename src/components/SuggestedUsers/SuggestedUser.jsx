import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser.js";
import useAuthStore from "../../store/authStore.js";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  // We will be passing in the suggested user id into this hook
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  // We will also need a reference to the authUser so we don't see the follow button for our user
  const authUser = useAuthStore((state) => state.user);

  // This function will update the searched user's state and call the handleFollowUser() function
  const onFollowUser = async () => {
    await handleFollowUser();
    // We will increment or decrement the followers count of the searched user
    setUser({
      ...user,
      followers: isFollowing
        ? // If following, we will filter the authUser's id to unfollow
          user.followers.filter((follower) => follower.uid !== authUser.uid)
        : // If unfollowing, we will add the authUser's uid to the searched user's followers array
          [...user.followers, authUser],
    });
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar src={user.profilePicURL} size={"md"} />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Link to={`/${user.username}`}>
            <Box fontSize={12} fontWeight={"bold"}>
              {user.fullName}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {/* If the authUser and searched user match, the follow button disappears, because a user can't follow themselves */}
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;

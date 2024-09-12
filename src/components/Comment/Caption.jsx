import { Flex, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo.js";
import useUserProfileStore from "../../store/userProfileStore.js";

const Caption = ({ post }) => {
  // The user should come from the Profile we're currently in
  const userProfile = useUserProfileStore((state) => state.userProfile);
  return (
    <Flex gap={4} w={"full"}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={"sm"} />
      </Link>
      <Flex direction={"column"} w={"full"}>
        <Flex gap={2}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12} mt={"2px"}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text
          fontSize={12}
          color={"gray"}
          w={"full"}
          textAlign={"end"}
          pr={"24px"}
        >
          {timeAgo(post.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;

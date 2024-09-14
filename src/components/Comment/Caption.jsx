import { Flex, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo.js";
import useUserProfileStore from "../../store/userProfileStore.js";

const Caption = ({ post }) => {
  // The user should come from the Profile we're currently in
  const userProfile = useUserProfileStore((state) => state.userProfile);
  return (
    <Flex gap={1} w={"full"} flexDir={"column"} mb={4}>
      <Flex gap={3} w={"full"} alignContent={"center"}>
        <Link to={`/${userProfile.username}`}>
          <Avatar src={userProfile.profilePicURL} size={"xs"} />
        </Link>
        <Flex gap={1} w={"full"} alignContent={"center"}>
          {" "}
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={14} h={"full"}>
              {userProfile.username}
            </Text>
          </Link>
          <Text
            fontSize={14}
            color={"gray"}
            h={"full"}
            // border={"1px solid red"}
          >{` • ${timeAgo(post.createdAt)}`}</Text>
        </Flex>
      </Flex>
      <Text fontSize={14}>{post.caption}</Text>
    </Flex>
  );
};

export default Caption;

import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById.js";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo.js";

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

  if (isLoading) return <CommentSkeleton />;
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
          <Text fontSize={14} color={"gray"} h={"full"}>{` • ${timeAgo(
            comment.createdAt
          )}`}</Text>
        </Flex>
      </Flex>
      <Text fontSize={14}>{comment.comment}</Text>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w={10} />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};

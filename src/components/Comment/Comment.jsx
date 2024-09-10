import { Flex, Text } from "@chakra-ui/react";

const Comment = ({ comment }) => {
  return (
    <Flex gap={4}>
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}></Text>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}></Text>
      </Flex>
    </Flex>
  );
};

export default Comment;

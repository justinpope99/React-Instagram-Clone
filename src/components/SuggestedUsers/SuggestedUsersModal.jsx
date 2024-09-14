import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers.js";
import SuggestedUser from "./SuggestedUser.jsx";

const SuggestedUsersModal = ({ isOpen, onClose }) => {
  const { suggestedUsers } = useGetSuggestedUsers();
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Suggested Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"350px"}
            overflowY={"auto"}
            padding={2}
            pr={5}
          >
            {suggestedUsers.map((user) => (
              <SuggestedUser user={user} key={user.uid} setUser={undefined} />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuggestedUsersModal;

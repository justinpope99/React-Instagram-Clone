import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        {/* We must wrap the contents of this container in a flex box so that both children appear side-by-side */}
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left hand-side */}
          {/* This line of code makes the page responsive. For the base, which are smaller screens and above, the left hand-side
                won't appear. For medium screens (tablet) and above, both sides will show.  */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="Phone image" />
          </Box>

          {/* Right hand-side */}
          {/* Vertical Stack is like a flex, but items go on top of each other, instead of side-by-side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app.</Box>
            {/* These two images will be side-by-side, so we will use Flex here */}
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={10} alt="Google Playstore Logo" />
              <Image
                src="/microsoft.png"
                h={10}
                alt="Microsoft Playstore Logo"
              />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;

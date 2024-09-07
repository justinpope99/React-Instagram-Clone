import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import GoogleAuth from "./GoogleAuth.jsx";

const AuthForm = () => {
  // We will create a state to create an additional input to confirm the password that will only appear if the user selects Sign Up
  // We can add this functionality with a state
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="logo.png" h={24} cursor={"pointer"} alt="Instagram" />

          {isLogin ? <Login /> : <Signup />}

          {/* --------------- OR ----------------- */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            {/* This box does not have any content, so it's self-closing */}
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      {/* Switch between Login and Sign Up */}
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {/* Login Page : Sign Up Page*/}
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          {/* We'll use an anonymous function to negate the Login state once the box is clicked */}
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;

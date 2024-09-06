import { Box, VStack, Image, Input, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AuthForm = () => {

    // We will create a state to create an additional input to confirm the password that will only appear if the user selects Sign Up
    // We can add this functionality with a state
    const [isLogin, setIsLogin] = useState(true)

    // We'll use react-router-dom take the user to the home page
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      email: "",
      password: "",
      confirmPassword: ""
    });

    // This function will handle the authentication and send the user to the Home Page
    const handleAuth = () => {
      // console.log("inputs", inputs)
      // This will check to see if all the inputs are filled, if not, an alert will be shown
      if(!inputs.email || !inputs.password) {
        alert("Please fill all the fields");
        return 
      }

      // The user will be navigated to the home page if all the fields are filled out
      navigate("/");
    }

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src="logo.png" h={24} cursor={"pointer"} alt="Instagram" />
            <Input 
                placeholder="Email"
                fontSize={14}
                type="email"
                value={inputs.email}
                // This will destructure all of the inputs and change only one, which is the email
                onChange={(e) => setInputs({...inputs, email:e.target.value})}
            />
            <Input 
                placeholder="Password"
                fontSize={14}
                type="password"
                value={inputs.password}
                // When the user types into this field, we're going to update the password state
                onChange={(e) => setInputs({...inputs, password:e.target.value})}
            />

              {!isLogin ? (
                <Input 
                    placeholder="Confirm Password"
                    fontSize={14}
                    type="password"
                  value={inputs.confirmPassword}
                  onChange={(e) => setInputs({...inputs, confirmPassword:e.target.value})} 
                />
              ) : null}

              <Button w={"full"} colorScheme={"blue"} size={"sm"} fontSize={14} onClick={handleAuth}>
                {isLogin? "Log in" : "Sign Up"}
              </Button>

              {/* --------------- OR ----------------- */}
              <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                {/* This box does not have any content, so it's self-closing */}
                <Box flex={2} h={"1px"} bg={"gray.400"} />
                <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={"1px"} bg={"gray.400"} />
              </Flex>

              <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
                <Image src="/public/google.png" w={5} alt="Google Logo" />
                <Text mx={2} color={"blue.500"}>
                  Log in with Google
                </Text>
              </Flex>
            
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
            <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
              {isLogin ? "Sign Up" : "Log in"}
            </Box>
        </Flex>
      </Box>
    </>
  )
}

export default AuthForm

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword.js";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // We are using a custom hook for the logic of signing the user up. This is called abstraction.
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        size={"sm"}
        // This will destructure all of the inputs and change only one, which is the email
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Username"
        fontSize={14}
        type="text"
        value={inputs.username}
        size={"sm"}
        // This will destructure all of the inputs and change only one, which is the email
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Full Name"
        fontSize={14}
        type="text"
        value={inputs.fullName}
        size={"sm"}
        // This will destructure all of the inputs and change only one, which is the email
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          // This will allow the password to be visible if we want it to be shown to the user.
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          // When the user types into this field, we're going to update the password state
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* If we have an error, we will show an alert that displays the error message */}
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme={"blue"}
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;

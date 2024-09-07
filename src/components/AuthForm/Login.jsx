import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin.js";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Implementing the login function
  const { loading, error, login } = useLogin();

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={inputs.email}
        // This will destructure all of the inputs and change only one, which is the email
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        fontSize={14}
        type="password"
        size={"sm"}
        value={inputs.password}
        // When the user types into this field, we're going to update the password state
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
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
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;

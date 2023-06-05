import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  ScaleFade,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterDiag() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });
  // loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // login error message
  const [errorMsg, setErrorMsg] = useState("");

  const authVariables = useAuthContext();
  const navigate = useNavigate();

  function testRegisterForm() {
    let isAnyFieldEmpty = false;
    Object.keys(registerForm).forEach((field) => {
      if (registerForm[field].length === 0)
        setErrorMsg("Please make sure that all fields are not empty");
      isAnyFieldEmpty = true;
    });

    if (isAnyFieldEmpty) {
      return false;
    } else if (registerForm.username.length < 5) {
      setErrorMsg("Username length must be at least 6 characters long.");
      return false;
    } else if (registerForm.password == !registerForm.re_password) {
      setErrorMsg("Passwords do not match.");
      return false;
    } else if (
      registerForm.password.length < 8 &&
      registerForm.re_password.length < 8
    ) {
      setErrorMsg("Password length must be at least 8 characters long.");
      return false;
    }

    return true;
  }

  async function handleOnSubmit() {
    console.log(registerForm);
    if (testRegisterForm()) {
      setIsLoading(true);
      await authVariables.registerUser(registerForm);
      if (authVariables.isUserAuthed) navigate("/");
      else {
        setErrorMsg("An error has occured. Please try again.");
      }
      setIsLoading(false);
    }
  }
  function handleInputChange(event) {
    setErrorMsg("");
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setRegisterForm({
      ...registerForm,
      [fieldName]: fieldValue,
    });
  }

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        {errorMsg && (
          <Alert status="error" variant={"subtle"} mb={"10px"}>
            <AlertIcon />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
        <Stack spacing={4}>
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                value={registerForm.first_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                w={"full"}
                type="text"
                name="last_name"
                value={registerForm.last_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Stack>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="username"
              name="username"
              value={registerForm.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={registerForm.password}
                onChange={handleInputChange}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="re_password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="re_password"
                value={registerForm.re_password}
                onChange={handleInputChange}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              isLoading={isLoading}
              size="lg"
              bg={"orange.400"}
              color={"white"}
              _hover={{
                bg: "orange.500",
              }}
              onClick={handleOnSubmit}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ScaleFade>
  );
}

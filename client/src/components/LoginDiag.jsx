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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginDiag() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  // loading spinner
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // login error message
  const authVariables = useAuthContext();
  // register error message
  const setErrorMsg = authVariables.setErrorMsg;
  const errorMsg = authVariables.errorMsg;

  useEffect(() => {
    if (authVariables.isUserAuthed) navigate("/");
  }, [authVariables.isUserAuthed]);

  async function handleOnSubmit() {
    setIsLoading(true);
    await authVariables.loginUser(loginForm);
    setIsLoading(false);
  }
  function handleInputChange(event) {
    // remove error message
    setErrorMsg("");
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setLoginForm({
      ...loginForm,
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
        alignSelf={"center"}
      >
        {errorMsg && (
          <Alert status="error" variant={"subtle"} mb={"10px"}>
            <AlertIcon />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={loginForm.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
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

          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            ></Stack>
            <Button
              onClick={handleOnSubmit}
              isLoading={isLoading}
              bg={"orange.400"}
              color={"white"}
              _hover={{
                bg: "orange.500",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ScaleFade>
  );
}

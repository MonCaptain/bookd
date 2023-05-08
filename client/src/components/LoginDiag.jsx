import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Checkbox,
  Stack,
  Button,
  useColorModeValue,
  ScaleFade,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginDiag() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const authVariables = useAuthContext();

  async function handleOnSubmit() {
    await authVariables.loginUser(loginForm);
    navigate("/");
  }

  function handleInputChange(event) {
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
        maxW={"400px"}
        w="100%"
        p={8}
      >
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

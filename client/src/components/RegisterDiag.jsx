import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  ScaleFade
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterDiag() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username:"",
    user_type:"",
    first_name:"",
    last_name:"",
    password:"",
    re_password:""
  });
  const authVariables = useAuthContext()
  const navigate = useNavigate()

  async function handleOnSubmit(){
    await authVariables.registerUser(registerForm)
    navigate("/")
  }

  function handleInputChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setRegisterForm({
      ...registerForm,
      [fieldName]:fieldValue
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
      <Stack spacing={4}>
        <HStack>
          <Box>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" name="first_name" value={registerForm.first_name} onChange={handleInputChange} />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" name="last_name" value={registerForm.last_name} onChange={handleInputChange} />
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="username" name="username" value={registerForm.username} onChange={handleInputChange}/>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? "text" : "password"} name="password" value={registerForm.password} onChange={handleInputChange}/>
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="re_password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? "text" : "password"} name="re_password" value={registerForm.re_password} onChange={handleInputChange}/>
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={10} pt={2}>
          <Button
            loadingText="Submitting"
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

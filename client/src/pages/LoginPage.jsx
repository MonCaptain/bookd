import { useState, React, useEffect } from "react";
import LoginDiag from "../components/LoginDiag";
import {
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import RegisterDiag from "../components/RegisterDiag";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function LoginPage({ logOrRegValue }) {
  const navigate = useNavigate();
  const isUserAuthed = useAuthContext().isUserAuthed;
  const [logOrReg, setLogOrReg] = useState(logOrRegValue);
  const authVariables = useAuthContext();
  const setErrorMsg = authVariables.setErrorMsg;
  useEffect(() => {
    if (isUserAuthed) navigate("/");
  }, [isUserAuthed]);
  return (
    <>
      <Navbar />
      <Flex justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack spacing={8} mx={"auto"} w={"full"} maxW={"700px"} py={12} px={6}>
          {logOrReg ? (
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Welcome back!</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Sign in to track of your books 📖
              </Text>
            </Stack>
          ) : (
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Glad you're joining us!</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Register to start your 📖 reading journey!
              </Text>
            </Stack>
          )}
          {logOrReg ? <LoginDiag /> : <RegisterDiag />}
          <Stack pt={6}>
            {logOrReg ? (
              <Text align={"center"}>
                Haven't joined yet? Click{" "}
                <Link
                  to={"/register"}
                  color={"orange.400"}
                  onClick={() => {
                    setErrorMsg("");
                    setLogOrReg(false);
                  }}
                >
                  here
                </Link>{" "}
                👈
              </Text>
            ) : (
              <Text align={"center"}>
                Already have an account? Click{" "}
                <Link
                  to={"/login"}
                  color={"orange.400"}
                  onClick={() => {
                    setErrorMsg("");
                    setLogOrReg(true);
                  }}
                >
                  here
                </Link>{" "}
                👈
              </Text>
            )}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

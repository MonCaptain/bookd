import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiLogIn } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.jpg"

function SplitScreen() {
  return (
    <Stack
      flex={1}
      minH={"100%"}
      direction={{ base: "column", md: "row" }}
      m={"0 !important"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "orange.400",
                zIndex: -1,
              }}
            >
              Book'd
            </Text>
            <br />{" "}
            <Text color={"orange.400"} as={"span"}>
              Helps Track Your Favorite Reads!
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Never lose a great read again. Save time and hassle by easily accessing
            your bookmarks from any device whether at home or on the go.
            Sign up now for free and experience the convenience for yourself!
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Link to="/login"><Button
              rounded={"full"}
              variant={"outline"}
              color={"orange.400"}
              borderColor={"orang.400"}
              leftIcon={<Icon as={BiLogIn} />}
            >
              Sign In
            </Button>
            </Link>
            <Link to={"/register"}>
            <Button
              rounded={"full"}
              variant={"solid"}
              bg={"orange.400"}
              color={"white"}
              leftIcon={<Icon as={BsPersonAdd} />}
              _hover={{ bg: "orange.600" }}
            >
              Sign up
            </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            heroImage
          }
        />
      </Flex>
    </Stack>
  );
}

export default function LandingPage() {
  return (
    <Stack minH={"100vh"} flexDir={"column"}>
      <SplitScreen />
    </Stack>
  );
}

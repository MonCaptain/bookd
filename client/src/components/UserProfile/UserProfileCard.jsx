import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function UserProfileCard({ username, bookEntryCount, avatar }) {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"} mt={5}>
          <Avatar
            size={"xl"}
            src={avatar}
            alt={"User"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {username}
            </Heading>
            <Text color={"gray.500"}>
              {" "}
              {bookEntryCount > 0
                ? `${bookEntryCount} entries`
                : "no entries"}{" "}
            </Text>
          </Stack>
          <Link to={`${username}`}>
            <Button
              w={"full"}
              mt={6}
              colorScheme="orange"
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View Profile
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}

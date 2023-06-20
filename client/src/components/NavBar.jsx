import {
  Box,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bookLogo from "../assets/bookLogo.png";

export default function Navbar() {
  return (
    <nav>
      <Box bg={useColorModeValue("gray.50", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            <Box>
              <HStack spacing={8} alignItems={"center"}>
                <Text
                  textColor={useColorModeValue("orange.500", "orange.400")}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Image src={bookLogo} width={8} />
                  Book'd
                </Text>
              </HStack>
            </Box>
          </Link>
        </Flex>
      </Box>
    </nav>
  );
}

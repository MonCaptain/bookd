import { ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Box bg={useColorModeValue("gray.50", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Link to="/">
              <Box>
                <Text color={"orange.400"} fontWeight={"900"}>
                  Get Book'd
                </Text>
              </Box>
            </Link>
          </HStack>
        </Flex>
      </Box>
    </nav>
  );
}

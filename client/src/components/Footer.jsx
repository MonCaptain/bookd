import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import OrangeGitHubLogo from "../assets/OrangeGitHubLogo.png";
import bookLogo from "../assets/bookLogo.png";
const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={"auto"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr", md: "2fr 2fr 2fr" }}
          spacing={8}
        >
          {/* SECTION 1 */}
          <Stack spacing={6} align="center">
            <Box>
              <HStack>
                <Text
                  textColor={useColorModeValue("orange.500", "orange.400")}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                <Image src={bookLogo} width={8}/>
                  Book'd
                </Text>
              </HStack>
            </Box>
            <Text fontSize={"sm"}>© 2023 Book'd . All rights reserved</Text>
          </Stack>
          {/* Section 2 */}
          <Stack align={"center"}>
            <ListHeader>Our Developers</ListHeader>
            <HStack>
              <Link href={"https://github.com/ShehabMohsen"} isExternal>
                Shehab Mohsen
              </Link>
              <Spacer />
              <Link href={"https://github.com/raynelfss"} isExternal>
                Raynel Sanchez
              </Link>
            </HStack>
            <HStack>
              <Link href={"https://github.com/jedrm"} isExternal>
                Jed Rendo Magracia
              </Link>
            </HStack>
          </Stack>

          {/* SECTION 3 */}
          <Stack align={"center"}>
            <ListHeader>Check us out on GitHub!</ListHeader>
            <Link href={"https://github.com/ShehabMohsen/get-bookd"} isExternal>
              <Image src={OrangeGitHubLogo} width={10} />
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

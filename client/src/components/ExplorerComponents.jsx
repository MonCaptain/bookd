import { ReactNode } from "react";
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  Stack,
  VStack,
  Link,
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import SearchBar from "./search";

// BookSearch Navigation
export function BookSearch({ handleChange }) {
  return (
    <>
      <Box bg={useColorModeValue("whiteAlpha.900", "gray.800")} p={4}>
        <Stack direction={{ base: "column", md: "row" }}>
          <VStack spacing={"0"} mx={4}>
            <Heading size={"md"} my={0}>
              BookSearch
            </Heading>
            <Text fontSize={"10px"} my={0}>
              Powered by{" "}
              <Link href="https://openlibrary.org/" isExternal>
                OpenLibrary
              </Link>
            </Text>
          </VStack>
          <SearchBar handleChange={handleChange} />
        </Stack>
      </Box>
    </>
  );
}

// Book card
export function SearchedBookCard({ cover, author, pagecount, title }) {
  return (
    <>
      <Card
        direction={{ base: "row", md: "column" }}
        rounded={"xl"}
        minH={{base: "230px", sm: "100%"}}
        alignItems={'center'}
        justifyContent={{base: 'center', md: 'space-between'}}
      >
        <Flex justifyContent={'center'} h={"100%"} bg={useColorModeValue("gray.100", "gray.500")}>
          <Image
            src={cover}
            alt={author}
            borderRadius="lg"
            w={{ base: "200px", md: "350px" }}
            h={{ base: "100%", md: "350px" }}
            objectFit={"cover"}
            objectPosition={"center"}
          />
        </Flex>
        <Flex direction={"column"} alignContent={'end'} w={"100%"}>
          <CardBody>
            <Stack>
              <Heading size="md" m={0} overflowWrap={"normal"}>
                {title.slice(0, 64)}
              </Heading>
              <Text m={"0!important"}>{author ? author : "N/A"}</Text>
              <Text
                color={useColorModeValue("blue.500", "cyan.500")}
                fontSize="2xl"
              >
                {pagecount ? `${pagecount} pages` : "N/A"}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
                Track
              </Button>
              <Button variant="ghost" colorScheme="blue">
                More Info
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Flex>
      </Card>
    </>
  );
}

// Book Dialog

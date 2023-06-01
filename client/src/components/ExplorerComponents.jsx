/* eslint-disable react/prop-types */
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
import SearchBar from "./Search";

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
export function SearchedBookCard({
  cover,
  author,
  pagecount,
  title,
  infopage,
  clickHandle,
}) {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        rounded={"xl"}
        justifyContent={"flex-start"}
        maxH={{ sm: "367px" }}
        h={"100%"}
      >
        <Image
          src={cover}
          alt={author}
          objectFit={"cover"}
          objectPosition={"center"}
          maxW={{ sm: "200px" }}
          w={"100%"}
          roundedTopLeft={"xl"}
          roundedBottomLeft={{ base: "0", sm: "xl" }}
          roundedTopRight={{ base: "xl", sm: "0" }}
        />

        <Flex direction={"column"} alignContent={"end"} w={"100%"}>
          <CardBody>
            <Stack>
              <Heading size="md" m={0} overflowWrap={"normal"}>
                {title.slice(0, 64)}
              </Heading>
              <Text m={"0!important"}>{author ? author : "N/A"}</Text>
              <Text colorScheme={"orange"} fontSize="2xl">
                {pagecount ? `${pagecount} pages` : "N/A"}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="orange"
                onClick={clickHandle}
              >
                Track
              </Button>
              <Button variant="ghost" colorScheme="orange">
                <Link href={infopage} isExternal>
                  More Info
                </Link>
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Flex>
      </Card>
    </>
  );
}

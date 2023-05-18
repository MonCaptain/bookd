/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function BookCard({ cover, author, currentPage, pagecount, title, progress, dropped, rating }) {
  let ratingStars = []
  for (let index = 0; index < 5; index++) {
    ratingStars.push(<Icon as={(index < rating) ? AiFillStar : AiOutlineStar} boxSize={8} key={index} color={'#faaf00'}/>)
  }
  return (
    <>
      <Card
        direction={{ base: "row", md: "column" }}
        rounded={"xl"}
        minH={{ base: "230px", sm: "100%" }}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Flex
          justifyContent={"center"}
          h={{ base: "100%", md: "" }}
          w={{ base: "200px", md: "100%" }}
        >
          <Image
            src={cover}
            alt={author}
            roundedTopLeft={"xl"}
            roundedBottomLeft={{ base: "xl", md: "0" }}
            roundedTopRight={{ base: "0", md: "xl" }}
            h={{ base: "100%", md: "350px" }}
            objectFit={"cover"}
            objectPosition={"center"}
            filter={dropped ? "grayscale(100%)" : ""}
            w={{ base: "200px", md: "100%" }}
          />
        </Flex>
        <Flex direction={"column"} alignContent={"end"} w={"100%"}>
          <CardBody>
            <Stack>
              <Heading size="md" m={0} overflowWrap={"normal"}>
                {title.slice(0, 64)}
              </Heading>
              <Text m={"0!important"}>{author ? author : "N/A"}</Text>
              <Text color={progress === 100 ? "green" : "orange"} fontSize="2xl">
                {currentPage ? `${currentPage}/${pagecount} Pages` : ""}
              </Text>
              { 
                progress ? 
                ( progress == 100 ?
                  <Progress value={progress} rounded={'full'} colorScheme="green"/>:
                  <Progress value={progress} rounded={'full'} colorScheme="orange"/>) : 
                <Progress colorScheme={'orange'} rounded={'full'} isIndeterminate/>
              }
              <Stack mt={"5!important"} mb={0} direction={{base: "row", md: "column"}}>
                <Text fontSize={'lg'} fontWeight={"500"}>Rating:</Text>
                <SimpleGrid columns={5} alignSelf={'center'} spacingX={3}>
                  {ratingStars}
                </SimpleGrid>
              </Stack>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="orange"
              >
                Track
              </Button>
              <Button variant="ghost" colorScheme="orange">
                <Link isExternal>
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

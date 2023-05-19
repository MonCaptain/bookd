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
  IconButton,
  Image,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

export default function BookCard({ cover, author, currentPage, pagecount, title, progress, dropped, rating, clickHandle, deleteHandle, favoriteHandle, isFavorite }) {
  let ratingStars = []
  for (let index = 0; index < 5; index++) {
    ratingStars.push(<Icon as={(index < rating) ? AiFillStar : AiOutlineStar} boxSize={8} key={index} color={dropped ? 'gray' : '#faaf00'}/>)
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
              <Text color={dropped ? 'gray' : (progress === 100 ? "green" : "orange")} fontSize="2xl">
                {currentPage ? `${currentPage}/${pagecount} Pages` : ""}
              </Text>
              { 
                progress ? 
                <Progress value={progress} rounded={'full'} colorScheme={dropped ? 'gray' : (progress == 100 ? "green" : "orange")}/> : 
                <Progress colorScheme={dropped ? 'gray' : 'orange'} rounded={'full'} isIndeterminate/>
              }
              <Stack mt={"5!important"} mb={0} direction={{base: "row", md: "column"}}>
                <Text fontSize={'lg'} fontWeight={"500"}>Personal Rating:</Text>
                <SimpleGrid columns={5} alignSelf={'center'} spacingX={3}>
                  {ratingStars}
                </SimpleGrid>
              </Stack>
            </Stack>
          </CardBody>
          <CardFooter>
              <Button
                variant="solid"
                colorScheme="orange"
                onClick={clickHandle}
              >
                Edit
              </Button>
              <Spacer></Spacer>
              <IconButton colorScheme="red" mr={2} onClick={() => deleteHandle()} icon={<Icon as={BiTrash}/>}></IconButton>
              <IconButton isDisabled={isFavorite} onClick={() => favoriteHandle()} icon={<Icon as={isFavorite? AiFillStar : AiOutlineStar} color={isFavorite? "#faaf00" : ""}></Icon>}></IconButton>
          </CardFooter>
        </Flex>
      </Card>
    </>
  );
}

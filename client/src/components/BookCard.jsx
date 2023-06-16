/* eslint-disable react/prop-types */
import {
  Button,
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
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

export default function BookCard({
  cover,
  author,
  currentPage,
  pagecount,
  title,
  progress,
  dropped,
  rating,
  clickHandle,
  deleteHandle,
  favoriteHandle,
  isFavorite,
}) {
  const favoriteBookColor = useColorModeValue("red.500", "red.200")
  let ratingStars = [];
  for (let index = 0; index < 5; index++) {
    ratingStars.push(
      <Icon
        as={index < rating ? AiFillStar : AiOutlineStar}
        boxSize={8}
        key={index}
        color={dropped ? "gray" : "#faaf00"}
      />
    );
  }

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
          filter={dropped ? "grayscale(100%)" : ""}
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
              <Text
                color={dropped ? "gray" : progress === 100 ? "green" : "orange"}
                fontSize="2xl"
              >
                {currentPage ? `${currentPage}/${pagecount} Pages` : ""}
              </Text>
              {progress ? (
                <Progress
                  value={progress}
                  rounded={"full"}
                  colorScheme={
                    dropped ? "gray" : progress == 100 ? "green" : "orange"
                  }
                />
              ) : (
                <Progress
                  colorScheme={dropped ? "gray" : "orange"}
                  rounded={"full"}
                  isIndeterminate
                />
              )}
              <Stack mt={"5!important"} mb={0} direction={"column"}>
                <Text fontSize={"lg"} fontWeight={"500"}>
                  Personal Rating:
                </Text>
                <SimpleGrid columns={5} alignSelf={"flex-start"} spacingX={3}>
                  {ratingStars}
                </SimpleGrid>
              </Stack>
            </Stack>
          </CardBody>
          <CardFooter columnGap={"5px"}>
            <Button
              variant="solid"
              colorScheme="orange"
              onClick={clickHandle}
              mr={2}
            >
              Edit
            </Button>
            <IconButton
              isActive={isFavorite}
              _hover={{ cursor: isFavorite ? "default" : "pointer" }}
              onClick={() => !isFavorite && favoriteHandle()}
              icon={
                <Icon
                  as={isFavorite ? AiFillHeart : AiOutlineHeart}
                  color={isFavorite ? favoriteBookColor : ""}
                ></Icon>
              }
            ></IconButton>
            <Spacer />
            <IconButton
              colorScheme="red"
              variant={"outline"}
              onClick={() => deleteHandle()}
              icon={<Icon as={BiTrash} />}
            ></IconButton>
          </CardFooter>
        </Flex>
      </Card>
    </>
  );
}

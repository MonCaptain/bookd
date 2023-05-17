import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Switch,
  Text,
  Divider,
  Button,
  Icon,
  SlideFade,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
import ProfileBookRow from "./ProfileBookRow";

export default function ProfileBookList({ bookList }) {
  const containerColor = useColorModeValue("whiteAlpha.900", "gray.800");

  return (
    <Box>
      <Heading mb={"20px"}>Book List</Heading>
      <Flex
        flexDirection={"column"}
        columnGap={"50px"}
        height="100%"
        padding={"20px"}
        bg={containerColor}
        borderRadius={"5px"}
      >
        <SlideFade in={bookList.length > 0} out={bookList.length === 0}>
          <SimpleGrid
            spacing={10}
            minH={"80vh"}
            alignItems={"center"}
            justifyContent={"center"}
            columns={[1, 1, 1, 1, 2, 3]}
            p={5}
          >
            {bookList.map((bookObject, index) => {
              return (
                <ProfileBookRow
                  key={index}
                  title={bookObject.book.title}
                  author={bookObject.book.author}
                  cover={bookObject.book.cover_image}
                  status = {bookObject.status}
                  rating = {bookObject.rating}
                  currentPage = {bookObject.current_page}
                />
              );
            })}
          </SimpleGrid>
        </SlideFade>
      </Flex>
    </Box>
  );
}

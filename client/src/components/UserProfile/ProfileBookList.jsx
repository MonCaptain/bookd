import {
  Box,
  Flex,
  Heading,
  SlideFade,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import ProfileBookRow from "./ProfileBookRow";

export default function ProfileBookList({ bookList }) {
  const containerColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const orangeTextTheme = useColorModeValue("orange.500", "orange.200");

  return (
    <Box>
      <Heading color={orangeTextTheme} mb={"20px"}>
        Book List
      </Heading>
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
                  readingStatus={bookObject.status}
                  rating={bookObject.rating}
                  currentPage={bookObject.current_page}
                />
              );
            })}
          </SimpleGrid>
        </SlideFade>
      </Flex>
    </Box>
  );
}

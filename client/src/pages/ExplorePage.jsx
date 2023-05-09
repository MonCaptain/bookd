import { Box, Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { searchQuery } from "../api/BookAPI";
import { useState, useEffect } from "react";
import { BookSearch, SearchedBookCard } from "../components/ExplorerComponents";

export default function ExplorePage() {
  let [fetchedBooks, setFetchedBooks] = useState([]);
  let [query, setQuery] = useState("");
  const fetchBooks = () => {
    if (query.length > 0) {
      searchQuery(query)
        .then((response) => response)
        .then((data) => {
          let bookArray = [];
          data.forEach((element, index) => {
            bookArray.push(
              <SearchedBookCard
                key={index}
                cover={element.cover}
                title={element.title}
                author={element.author}
                pagecount={element.pages}
              />
            );
          });
          setFetchedBooks(bookArray);
        });
    } else {
      setFetchedBooks([]);
    }
  };

  useEffect(() => {
    const timeOutTrack = setTimeout(() => {
      fetchBooks(query);
    }, 500);
    return () => clearTimeout(timeOutTrack);
  }, [query]);

  return (
    <Box>
      <BookSearch handleChange={(e) => setQuery(e.target.value)} />
      <Flex bg={useColorModeValue("whiteAlpha.900", "gray.800")} minH={"80vh"} alignItems={'center'} justifyContent={'center'}>
      { query.length > 0 ? (
          fetchedBooks.length > 0 ? (
        <SimpleGrid
          spacing={10}
          minH={"80vh"}
          bg={useColorModeValue("whiteAlpha.900", "gray.800")}
          alignItems={"center"}
          justifyContent={"center"}
          columns={[1, null, 2,3, 4, null]}
          p={5}
        >
          {fetchedBooks}
        </SimpleGrid>
          ) : (
            <Text fontSize={"xl"} align={'center'}>No books found 🥺</Text>
          )) : (<Text fontSize={"xl"} align={'center'}> Wanna find your next read? 😊</Text>)
      }
      </Flex>
    </Box>
  );
}

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
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
      <Flex
        gap={6}
        minH={"80vh"}
        bg={useColorModeValue("whiteAlpha.900", "gray.800")}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {query.length > 0 ? (
          fetchedBooks.length > 0 ? (
            fetchedBooks
          ) : (
            <Text fontSize={"xl"}>No books found 🥺</Text>
          )
        ) : (
          <Text fontSize={"xl"}> Wanna find your next read? 😊</Text>
        )}
      </Flex>
    </Box>
  );
}

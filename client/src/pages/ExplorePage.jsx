import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  Spinner,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import { searchQuery } from "../api/BookAPI";
import { useState, useEffect } from "react";
import { BookForm, BookSearch, SearchedBookCard } from "../components/ExplorerComponents";

export default function ExplorePage() {
  let [fetchedBooks, setFetchedBooks] = useState([]);
  let [currentBook, setCurrentBook] = useState({});
  let [query, setQuery] = useState("");
  let [searching, setSearching] = useState(<Spinner size={"xl"} />);
  const {isOpen, onOpen, onClose} = useDisclosure();

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
                infopage={element.infopage}
                clickHandle={(e) => {
                  setCurrentBook(element)
                  onOpen()
                }}
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
    setSearching(<Spinner color="orange.500" size={"xl"} />);
    setFetchedBooks([]);
    const fetchingTimer = setTimeout(() => {
      setSearching(
        <Text fontSize={"xl"} align={"center"}>
          No books found 🥺
        </Text>
      );
    }, 5000);
    const timeOutTrack = setTimeout(() => {
      fetchBooks(query);
    }, 500);

    return () => {
      clearTimeout(timeOutTrack);
      clearTimeout(fetchingTimer);
    };
  }, [query]);

  return (
    <Box>
      <BookSearch handleChange={(e) => setQuery(e.target.value)} />
      <Flex
        bg={useColorModeValue("whiteAlpha.900", "gray.800")}
        minH={"80vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <BookForm title={currentBook.title} author={currentBook.author} pages={currentBook.pages} cover={currentBook.cover} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        {query.length > 0 ? (
          fetchedBooks.length > 0 ? (
            <SlideFade
              in={fetchedBooks.length > 0}
              out={fetchedBooks.length === 0}
            >
              <SimpleGrid
                spacing={10}
                minH={"80vh"}
                alignItems={"center"}
                justifyContent={"center"}
                columns={[1, null, 2, 3, 4, null]}
                p={5}
              >
                {fetchedBooks}
              </SimpleGrid>
            </SlideFade>
          ) : (
            searching
          )
        ) : (
          <Text fontSize={"xl"} align={"center"}>
            {" "}
            Wanna find your next read? 😊
          </Text>
        )}
      </Flex>
    </Box>
  );
}
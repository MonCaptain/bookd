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
import { BookSearch, SearchedBookCard } from "../components/ExplorerComponents";
import BookForm from "../components/BookForm";
import apiClient from "../services/apiClient";

export default function ExplorePage() {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState({});
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(<Spinner size={"xl"} />);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modifyBook = (props) => {
    let newBook = Object.assign(currentBook, props);
    setCurrentBook(newBook);
  };

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
                clickHandle={() => {
                  setCurrentBook(element);
                  onOpen();
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
        <BookForm
          title={currentBook.title}
          author={currentBook.author}
          pages={currentBook.pages}
          cover={currentBook.cover}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          submitBook={(postEntry) => {
            Promise.resolve(
              apiClient.postBook({
                title: currentBook.title,
                author: currentBook.author,
                page_count: currentBook.pages,
                publication_date: currentBook.publish_date,
                cover_image: currentBook.cover,
                isbn: currentBook.isbn,
              })
            ).then((result) => {
              onClose();
              postEntry(result);
              return result;
            });
          }}
          modifier={modifyBook}
        />
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

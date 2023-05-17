import { Box, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import apiClient from "../services/apiClient";
import BookCard from "../components/BookComponents";

export default function BookList({ pageTitle }) {
  // fetch user book list, and then filter them based on reading status
  // i.e. currently_reading, completed, dropped, all, etc...
  useEffect(() => {}, []);

  let bookEntries = []
  Promise.resolve(apiClient.retrieveEntries()).then((results) => {
    bookEntries = results.map((bookEntry, index) => {
      let book = bookEntry.book;
      return (<BookCard cover={book.cover_image} title={book.title} pagecount={book.page_count} key={index}></BookCard>)
    })
  })

  return (
    <Box minW={'100%'} minH={'85vh'} bg={useColorModeValue('white', 'gray.900')} p={5}>
      <Heading>{pageTitle}</Heading>
      <SimpleGrid>
        {bookEntries}
      </SimpleGrid>
    </Box>
  );
}

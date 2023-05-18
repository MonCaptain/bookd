import { Box, Heading, SimpleGrid, SlideFade, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import BookCard from "../components/BookComponents";

export default function BookList({ pageTitle, category }) {
  // fetch user book list, and then filter them based on reading status
  // i.e. currently_reading, completed, dropped, all, etc...

  let [bookEntries, setBookEntries] = useState([]);

  const fetchEntries = () => 
  {
    Promise.resolve(apiClient.retrieveEntries()).then((results) => {
      let fetchedEntries = results.map((bookEntry, index) => {
        if (bookEntry.status === category) {
        return <BookCard 
          cover={bookEntry.book.cover_image} 
          title={bookEntry.book.title} 
          author={bookEntry.book.author}
          currentPage={bookEntry.current_page}
          pagecount={bookEntry.book.page_count}
          progress={(bookEntry.current_page/bookEntry.book.page_count)*100}
          rating={bookEntry.rating}
          key={index}>
        </BookCard>
        }})
        setBookEntries(fetchedEntries)
      })
  }

  useEffect(() => {
    setBookEntries([])
    fetchEntries();
  }, [category]);

  return (
    <Box minW={'100%'} minH={'85vh'} bg={useColorModeValue('white', 'gray.900')} p={5}>
      <Heading>{pageTitle}</Heading>
      <SlideFade
              in={bookEntries.length > 0}
              out={bookEntries.length === 0}
            >
        <SimpleGrid spacing={10}
                alignItems={"center"}
                justifyContent={"center"}
                columns={[1, null, 2, 3, 4, null]}
                gridRow={'unset'}
                p={5}>
          {bookEntries}
        </SimpleGrid>
      </SlideFade>
    </Box>
  );
}

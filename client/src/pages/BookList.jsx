/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, SimpleGrid, SlideFade, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import BookCard from "../components/BookCard";
import EntryForm from "../components/EntryForm";

export default function BookList({ pageTitle, category }) {
  // color themes 
  const orangeTextTheme = useColorModeValue("orange.500", "orange.200");
  
  // fetch user book list, and then filter them based on reading status
  // i.e. currently_reading, completed, dropped, all, etc...

  const [bookEntries, setBookEntries] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alertDiagHandler = useDisclosure();
  const favoriteAlertDiagHandler = useDisclosure();
  const [currentEntry, setCurrentEntry] = useState({book: {}})

  const fetchEntries = () => 
  {
    Promise.resolve(apiClient.retrieveUsername()).then((username) => 
    Promise.resolve(apiClient.getUserProfile(username)).then((profile) => {
      Promise.resolve(apiClient.retrieveEntries()).then((results) => {
      let fetchedEntries = results.map((bookEntry, index) => {
        if (bookEntry.status === category || pageTitle === "All Book Entries" ) {
        let isFavorite = (profile.favorite_book === null) ? false : (bookEntry.book.id === profile.favorite_book.id);
        return <BookCard 
          cover={bookEntry.book.cover_image} 
          title={bookEntry.book.title} 
          author={bookEntry.book.author}
          currentPage={bookEntry.current_page}
          pagecount={bookEntry.book.page_count}
          dropped={category == "Dropped"}
          progress={(bookEntry.current_page/bookEntry.book.page_count)*100}
          rating={bookEntry.rating}
          key={index}
          clickHandle={() => {
            setCurrentEntry(bookEntry);
            onOpen();
          }}
          deleteHandle={() => {
            setCurrentEntry(bookEntry);
            alertDiagHandler.onOpen();
          }}
          isFavorite={isFavorite}
          favoriteHandle={() => {
            setCurrentEntry(bookEntry);
            favoriteAlertDiagHandler.onOpen();
          }
          }>
        </BookCard>
        }})
        setBookEntries(fetchedEntries)
      })
    }))
  }

  const BookAlertDiag = ({isOpen, onClose}) => {
    return (
      <>
        <AlertDialog
          motionPreset='slideInBottom'
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you want to delete "{currentEntry.book.title}" from your books?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>
                No
              </Button>
              <Button colorScheme='red' ml={3} onClick={() => deleteEntry()}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  const FavoriteAlertDiag = ({isOpen, onClose}) => {
    return (
      <>
        <AlertDialog
          motionPreset='slideInBottom'
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Set Favorite Book</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you want to make "{currentEntry.book.title}" your favorite book?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>
                No
              </Button>
              <Button colorScheme='orange' ml={3} onClick={() => selectFavorite()}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
  const updateEntryState = (props) => {
    let newEntry = Object.assign(currentEntry, props);
    setCurrentEntry(newEntry);
  }

  const updateEntry = () => {
    Promise.resolve(apiClient.editEntry(currentEntry.id, currentEntry)).then(() => onClose()
    )
  }

  const deleteEntry = () => {
    Promise.resolve(apiClient.deleteEntry(currentEntry.id)).then(() => alertDiagHandler.onClose())
  }

  const selectFavorite = () => {
    Promise.resolve(apiClient.retrieveUsername()).then((username) => {
      Promise.resolve(apiClient.editProfile(username, {favorite_book_id: currentEntry.book.id})).then((profile) => {
        favoriteAlertDiagHandler.onClose()
      })
    })
  };

  useEffect(() => {
    if (!favoriteAlertDiagHandler.isOpen) {
      setBookEntries([]);
      fetchEntries();
    }
  }, [category, favoriteAlertDiagHandler.isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setBookEntries([]);
      fetchEntries();
    }
  }, [category, isOpen]);

  useEffect(() => {
    if (!alertDiagHandler.isOpen) {
      setBookEntries([]);
      fetchEntries();
    }
  }, [category, alertDiagHandler.isOpen]);

  return (
    <Box minW={'100%'} minH={'85vh'} bg={useColorModeValue('white', 'gray.900')} p={5}>
      <Heading color={orangeTextTheme}>{pageTitle}</Heading>
      <BookAlertDiag isOpen={alertDiagHandler.isOpen} onClose={alertDiagHandler.onClose}/>
      <FavoriteAlertDiag isOpen={favoriteAlertDiagHandler.isOpen} onClose={favoriteAlertDiagHandler.onClose}/>
      <EntryForm book={currentEntry.book} current={currentEntry.current_page} isOpen={isOpen} onOpen={onOpen} onClose={onClose} modifier={updateEntryState} submitEntry={updateEntry}/>
      <SlideFade
          in={bookEntries.length > 0}
          out={bookEntries.length === 0}
        >
        <SimpleGrid spacing={5}
                alignItems={"center"}
                justifyContent={"center"}
                columns={[1, 1, 1, 1, 2, 3]}
                gridRow={'unset'}
                // padding
                pt={5}
                pb={5}
                >
          {bookEntries}
        </SimpleGrid>
      </SlideFade>
    </Box>
  );
}

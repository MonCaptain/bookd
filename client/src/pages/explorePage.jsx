import { Box, SimpleGrid ,Stack} from "@chakra-ui/react";
import { searchQuery } from '../api/bookAPI'
import BookCard from "../components/bookComponents";
import { useState } from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";

export default function ExplorePage() {
    let [fetchedBooks, setFetchedBooks] = useState([])
    let [toSearch, setToSearch] = useState("")
    const fetchBooks = () => {
        searchQuery(toSearch).then(
            response => response).then(data => {
                let fetchedBooks = []
                data.forEach((element, index) => {
                    fetchedBooks.push(
                    <BookCard
                        key={index}
                        cover={element.cover}
                        title={element.title}
                        author={element.author}
                        pagecount={element.pages}
                    />
                    )
            })
                setFetchedBooks(fetchedBooks)
            })
    }

    let handleSearch = (e) => {
        setToSearch(e.target.value)
        console.log("Searched")
        if (toSearch.length) {
            fetchBooks()
        }
    }

    return (
    <Box>
        <SidebarWithHeader withSearch/>
        <Stack>
            <SimpleGrid spacing={4} columns={{base: 1, md: 3}} >
                {fetchedBooks}
            </SimpleGrid>
        </Stack>
    </Box>
    )
}
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

export default function BookList({ listType }) {
  // fetch user book list, and then filter them based on reading status
  // i.e. currently_reading, completed, dropped, all, etc...
  useEffect(() => {}, []);

  return (
    <Box>
      <h1>Book List grid of type {listType}</h1>
    </Box>
  );
}

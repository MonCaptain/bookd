import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
export default function UserProfile() {
  const { username } = useParams()

  return (
    <Box>
      <Flex>
      </Flex>
    </Box>
  );
}

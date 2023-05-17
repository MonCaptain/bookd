import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useAuthContext } from "../contexts/AuthContext";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import apiClient from "../services/apiClient";

export default function UserProfile({ isOriginalUser = false }) {
  const authedUser = useAuthContext().userData;
  const usernameParams = useParams().username;
  // if the user is browsing their own profile, then allow them to edit it
  isOriginalUser = isOriginalUser || usernameParams === authedUser.username;
  const requestParams = isOriginalUser ? authedUser.username : usernameParams;

  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      const responseData = await apiClient.getUserProfile(requestParams);
      setUserProfile(responseData);
      setIsLoading(false);
    }
    fetchUserProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <Box>
          {/* Display user states and fun fact information */}
          <Heading mb={"20px"}>User Profile</Heading>
          <Flex
            columnGap={"50px"}
            height="full"
            maxHeight={"30vh"}
            padding={"20px"}
            bg={useColorModeValue("whiteAlpha.900", "gray.800")}
            borderRadius={"5px"}
          >
            <Image
              boxSize="250px"
              objectFit="cover"
              src={`http://localhost:8000${userProfile.profile_picture}`}
              alt="Dan Abramov"
            />

            <Box>
              <p>{userProfile.user.username}</p>
              <p>Favorite Book: {userProfile.favorite_book.title}</p>
              <p>{userProfile.book_list.length} book entries</p>
              <Stack direction="row" columnGap={10}>
                <Text>Set Private Profile?</Text>
                <Switch
                  colorScheme="orange"
                  size="lg"
                  isChecked={userProfile.private}
                />
              </Stack>
            </Box>
          </Flex>
          {/* Display user books list */}
          <Box mt={"20px"}>
            <Heading >Book List</Heading>
          </Box>
        </Box>
      )}
    </>
  );
}

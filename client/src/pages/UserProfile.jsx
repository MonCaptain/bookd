import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Switch,
  Text,
  Divider,
  Button,
  Icon,
  SlideFade,
  SimpleGrid
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../contexts/AuthContext";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import apiClient from "../services/apiClient";
import ProfileBookList from "../components/UserProfile/ProfileBookList";

export default function UserProfile({ isOriginalUser = false }) {
  const containerColor = useColorModeValue("whiteAlpha.900", "gray.800");
  // extract username that's being used if it exists in the paramter
  const usernameParams =
    Object.keys(useParams()).length === 1 ? useParams().username : "";
  // get userData of the user that is browsing this page
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;
  const authedUser = authVariables.userData;
  // if the user is browsing their own profile, then allow them to edit it
  isOriginalUser = isOriginalUser || usernameParams === authedUser.username;
  const requestParams = isOriginalUser ? authedUser.username : usernameParams;
  // statevariables required to rendering user related information
  const [userProfile, setUserProfile] = useState(null);
  const [bookList, setBookList] = useState([]);
  // don't render anything until the data is fetched
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUserProfile() {
      const responseData = await apiClient.getUserProfile(requestParams);
      setUserProfile(responseData);
      setBookList(responseData.book_list);
      if (!responseData.detail) setIsLoading(false);
    }

    if (isUserAuthed && requestParams) fetchUserProfile();
  }, [requestParams, isUserAuthed]);
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <Box display={"flex"} flexDirection={"column"} rowGap={"20px"}>
          {/* Display user stat and fun fact information */}
          <Heading>User Profile</Heading>
          <Flex
            columnGap={"50px"}
            height="100%"
            maxHeight={"30vh"}
            padding={"20px"}
            bg={containerColor}
            borderRadius={"5px"}
          >
            <Image
              boxSize="250px"
              objectFit="cover"
              src={`http://localhost:8000${userProfile.profile_picture}`}
              alt="Dan Abramov"
            />
            {/* Profile and Settings */}
            <Box
              display="flex"
              flexDirection={"column"}
              rowGap={"10px"}
              width={"full"}
              maxWidth={"425px"}
            >
              <Text color={"orange.600"} fontWeight={"bold"}>
                {userProfile.user.username}
              </Text>
              <Text>Favorite Book: {userProfile.favorite_book.title}</Text>
              <Text>{userProfile.book_list.length} book entries</Text>
              <Stack direction="row">
                <Text>Set Private Profile?</Text>
                <Spacer />
                <Switch
                  colorScheme="orange"
                  size="lg"
                  isChecked={userProfile.private}
                />
              </Stack>
              <Stack direction="row">
                <Text>Dark mode?</Text>
                <Spacer />
                <Switch colorScheme="orange" size="lg" />
              </Stack>
              <Button leftIcon={<EditIcon />}>Change Profile Picture</Button>
            </Box>
            <Divider orientation="vertical" />

            {/* Book Stats */}
            <Box
              display="flex"
              flexDirection={"column"}
              rowGap={"10px"}
              width={"full"}
              maxWidth={"425px"}
            >
              <Text color={"orange.600"} fontWeight={"bold"}>
                Book Stats
              </Text>
              <Stack direction="row">
                <Text>Favorite Book:</Text>
                <Spacer />
                <Text>{userProfile.favorite_book.title}</Text>
              </Stack>
              <Stack direction="row">
                <Text>All</Text>
                <Spacer />
                <Text>20</Text>
              </Stack>
              <Stack direction="row">
                <Text>Completed</Text>
                <Spacer />
                <Text>10</Text>
              </Stack>
              <Stack direction="row">
                <Text>Dropped</Text>
                <Spacer />
                <Text>2</Text>
              </Stack>
              <Stack direction="row">
                <Text>Not yet started</Text>
                <Spacer />
                <Text>2</Text>
              </Stack>
            </Box>
          </Flex>
          {/* Display user books list */}
          <ProfileBookList bookList={bookList}/>
        </Box>
      )}
    </>
  );
}

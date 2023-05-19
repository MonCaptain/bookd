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
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import BookList from "./../../pages/BookList";
export default function ProfileSettingsStats({
  isOriginalUser,
  userProfile,
  setProfilePicture,
}) {
  // styling related
  const { colorMode, toggleColorMode } = useColorMode();
  const containerColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const orangeTextTheme = useColorModeValue("orange.500", "orange.200");
  // settings related
  const [isProfilePrivate, setIsProfilePrivate] = useState(userProfile.private);
  const [selectedImage, setSelectedImage] = useState(null);
  // book stats related
  const [bookList, setBookList] = useState(userProfile.book_list);
  const [bookCountByCategory, setBookCountByCategory] = useState({
    All: 0,
    "Not started": 0,
    Dropped: 0,
    Completed: 0,
    "In Progress": 0,
  });

  async function handleOnPrivacyToggle() {
    await apiClient.editProfile(userProfile.user.username, {
      private: !isProfilePrivate,
    });
    setIsProfilePrivate(!isProfilePrivate);
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  async function handleUpload() {
    if (selectedImage) {
      await apiClient.uploadProfilePicture(userProfile.user.username, {
        image_url: selectedImage,
      });
      const fetchedUserProfile = await apiClient.getUserProfile(
        userProfile.user.username
      );
      setProfilePicture(fetchedUserProfile.profile_picture);
    }
  }

  useEffect(() => {
    let categoryCountObject = {
      All: 0,
      "Not started": 0,
      Dropped: 0,
      Completed: 0,
      "In Progress": 0,
    };

    if (userProfile) {
      bookList.map((element, index) => {
        categoryCountObject[`${element.status}`] += 1;
        categoryCountObject.All += 1;
      });

      setBookCountByCategory(categoryCountObject);
    }
  }, [bookList]);

  return (
    <>
      <Heading textColor={orangeTextTheme}>User Profile</Heading>
      <Flex
        columnGap={"50px"}
        rowGap={"50px"}
        height="100%"
        padding={"20px"}
        bg={containerColor}
        borderRadius={"5px"}
        flexDirection={{base:"column", md:"row"}}
      >
        <Image
          boxSize="250px"
          objectFit="cover"
          src={`http://localhost:8000${userProfile.profile_picture}`}
          alt="Dan Abramov"
          fallbackSrc="https://via.placeholder.com/250"
        />
        {/* Profile and Settings */}
        {isOriginalUser && (
          <Box
            display="flex"
            flexDirection={"column"}
            rowGap={"10px"}
            width={"full"}
            maxWidth={"425px"}
          >
            <Text color={orangeTextTheme} fontWeight={"bold"}>
              {userProfile.user.first_name} {userProfile.user.last_name}
            </Text>
            <Stack direction={"row"}>
              <Text>Favorite Book: </Text>
              <Spacer />
              <Text>
                {userProfile.favorite_book
                  ? userProfile.favorite_book.title
                  : "None"}
              </Text>
            </Stack>
            <Text>{userProfile.book_list.length} book entries</Text>
            {isOriginalUser && (
              <Stack direction="row">
                <Text>Private Profile</Text>
                <Spacer />
                <Switch
                  colorScheme="orange"
                  size="lg"
                  isChecked={isProfilePrivate}
                  onChange={handleOnPrivacyToggle}
                />
              </Stack>
            )}
            {isOriginalUser && (
              <Stack direction="row">
                <Text>Dark mode</Text>
                <Spacer />
                <Switch
                  colorScheme="orange"
                  size="lg"
                  onChange={toggleColorMode}
                  isChecked={colorMode === "dark" ? true : false}
                />
              </Stack>
            )}
            {isOriginalUser && (
              <Stack direction={"row"} alignItems={"center"}>
                <Box
                  width={"full"}
                  fontWeight={"semibold"}
                  colorScheme="orange"
                  bg={colorMode == "light" ? "gray.100" : "gray.700"}
                  padding={"9px"}
                  borderRadius={"5px"}
                >
                  <label
                    htmlFor="file-upload"
                    style={{ marginBottom: "1rem" }}
                    width="100%"
                  >
                    <Box _hover={{ cursor: "pointer" }} width={"full"}>
                      Edit Profile Picture
                    </Box>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    accept="image/jpeg,image/png,image/gif"
                  />
                </Box>
                <Button
                  colorScheme="orange"
                  onClick={handleUpload}
                  width={"50%"}
                >
                  Upload
                </Button>
              </Stack>
            )}
          </Box>
        )}

        {/* Book Stats */}
        <Box
          display="flex"
          flexDirection={"column"}
          rowGap={"10px"}
          width={"full"}
          maxWidth={"425px"}
        >
          <Text color={orangeTextTheme} fontWeight={"bold"}>
            Book Stats
          </Text>
          <Stack direction="row">
            <Text>Favorite Book:</Text>
            <Spacer />
            <Text>
              {userProfile.favorite_book
                ? userProfile.favorite_book.title
                : "None"}
            </Text>
          </Stack>
          <Stack direction="row">
            <Text>All</Text>
            <Spacer />
            <Text>{bookCountByCategory.All}</Text>
          </Stack>
          <Stack direction="row">
            <Text>Completed</Text>
            <Spacer />
            <Text>{bookCountByCategory.Completed}</Text>
          </Stack>
          <Stack direction="row">
            <Text>In Progress</Text>
            <Spacer />
            <Text>{bookCountByCategory["In Progress"]}</Text>
          </Stack>
          <Stack direction="row">
            <Text>Not yet started</Text>
            <Spacer />
            <Text>{bookCountByCategory["Not started"]}</Text>
          </Stack>
          <Stack direction="row">
            <Text>Dropped</Text>
            <Spacer />
            <Text>{bookCountByCategory.Dropped}</Text>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

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
import { EditIcon } from "@chakra-ui/icons";
import apiClient from "../../services/apiClient";
import { useState } from "react";
export default function ProfileSettingsStats({ userProfile, isOriginalUser }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const containerColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const [isProfilePrivate, setIsProfilePrivate] = useState(userProfile.private);

  async function handleOnPrivacyToggle() {
    await apiClient.editProfile(userProfile.user.username, { private: !isProfilePrivate });
    setIsProfilePrivate(!isProfilePrivate);
  }

  return (
    <>
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
          {isOriginalUser && (
            <Stack direction="row">
              <Text>Set Private Profile?</Text>
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
              <Text>Dark mode?</Text>
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
            <Button leftIcon={<EditIcon />}>Change Profile Picture</Button>
          )}
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
    </>
  );
}

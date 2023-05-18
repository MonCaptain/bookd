import { Box, SimpleGrid, Center, Flex } from "@chakra-ui/react";
import UserProfileCard from "../components/UserProfile/UserProfileCard";
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export default function ExploreUsersPage() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllUsers() {
      const responseData = await apiClient.getAllUserProfiles();
      setUserProfiles(responseData);
      setIsLoading(false);
    }
    fetchAllUsers();
  }, []);
  return (
    <Flex justifyContent={"center"}>
      <Box maxWidth={1200} width={"full"}>
        <SimpleGrid columns={[1, 2, 3]} spacingX={"40px"} spacingY={"10px"}>
          {!isLoading &&
            userProfiles.length > 0 &&
            userProfiles.map((profileElement, index) => {
              return <UserProfileCard
                key={index}
                username={profileElement.user.username}
                bookEntryCount={profileElement.book_list.length}
                avatar={profileElement.profile_picture}
              />;
            })}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

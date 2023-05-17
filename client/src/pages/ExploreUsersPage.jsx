import { Box, SimpleGrid, Center, Flex } from "@chakra-ui/react";
import UserProfileCard from "../components/UserProfileCard";

export default function ExploreUsersPage() {
  return (
    <Flex justifyContent={"center"}>
      <Box maxWidth={1200} width={"full"}>
      <SimpleGrid  columns={[1, 2, 3]} spacingX={'40px'} spacingY={"10px"}>
        <UserProfileCard />
        <UserProfileCard />
        <UserProfileCard />
        <UserProfileCard />
        <UserProfileCard />
        <UserProfileCard />
        <UserProfileCard />
      </SimpleGrid>
      </Box>
    </Flex>
  );
}
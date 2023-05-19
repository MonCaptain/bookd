import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import apiClient from "../services/apiClient";
import ProfileBookList from "../components/UserProfile/ProfileBookList";
import ProfileSettingsStats from "../components/UserProfile/ProfileSettingsStats";

export default function UserProfile({ isOriginalUser = false }) {
  // extract username that's being used if it exists in the paramter
  const usernameParams =
    Object.keys(useParams()).length === 1 ? useParams().username : "";
  // get userData of the user that is browsing this page
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;
  const authedUser = authVariables.userData;
  // if the user is browsing their own profi
  le, then allow them to edit it
  isOriginalUser = isOriginalUser || usernameParams === authedUser.username;
  const requestParams = isOriginalUser ? authedUser.username : usernameParams;
  // statevariables required to rendering user related information
  const [userProfile, setUserProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [bookList, setBookList] = useState([]);
  // don't render anything until the data is fetched
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUserProfile() {
      const responseData = await apiClient.getUserProfile(requestParams);
      setUserProfile(responseData);
      setBookList(responseData.book_list);
      setProfilePicture(responseData.profile_picture);
      if (!responseData.detail) setIsLoading(false);
    }

    if (isUserAuthed && requestParams) fetchUserProfile();
  }, [requestParams, isUserAuthed, profilePicture]);

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <Box display={"flex"} flexDirection={"column"} rowGap={"20px"}>
          {/* Display user stat and fun fact information */}
          <ProfileSettingsStats
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            isOriginalUser={isOriginalUser}
            setProfilePicture={setProfilePicture}
          />
          {/* Display user books list */}
          <ProfileBookList bookList={bookList} />
        </Box>
      )}
    </>
  );
}

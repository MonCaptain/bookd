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
    </>
  );
}

import { useState, useEffect, createContext, useContext } from "react";
import apiClient from "../services/apiClient";

const LOCAL_STORAGE_AUTH_KEY = "local_storage_tokens_key";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const userDataTemplate = {
  id: -1,
  username: "",
  first_name: "",
  last_name: "",
};

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(userDataTemplate);
  const [isUserAuthed, setIsUserAuthed] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  async function loginUser(loginForm) {
    try {
      const tokensData = await apiClient.login(loginForm);
      // set tokens state to contain the response data
      if (tokensData.access) {
        /* put tokens in local storage to use for login persistance. 
        (the following two lines do the same thing, will delete one of them later) */
        apiClient.setTokens(tokensData);
        localStorage.setItem(
          LOCAL_STORAGE_AUTH_KEY,
          JSON.stringify(tokensData)
        );
        // finally, login the user using the tokens
        const responseUserData = await apiClient.loginWithToken();
        const responseUserProfileData = await apiClient.getUserProfile(
          responseUserData.username
        );
        setUserData(responseUserData);
        setUserProfile(responseUserProfileData);
        setIsUserAuthed(true);
      } else if (
        tokensData.detail ==
        "No active account found with the given credentials"
      ) {
        setErrorMsg("No active account found with the given credentials");
      } else {
        setErrorMsg("An error has occurred. Please try again");
      }
    } catch (error) {
      if (import.meta.env.VITE_ENV === "development") console.log(error);
    }
  }
  async function registerUser(registerForm) {
    apiClient.removeTokens();
    try {
      const response = await apiClient.register(registerForm);
      console.log(response);
      if (response.success) {
        await loginUser({
          username: registerForm.username,
          password: registerForm.password,
        });
      } else if (response.error == "User with this username already exists") {
        setErrorMsg("User with this username already exists");
      } else {
        setErrorMsg("An error has occurred. Please try again");
      }
    } catch (error) {
      if (import.meta.env.VITE_ENV === "development") console.log(error);
    }
  }
  async function logoutUser() {
    try {
      await apiClient.logout();
      setUserData(userDataTemplate);
      setIsUserAuthed(false);
    } catch (error) {
      if (import.meta.env.VITE_ENV === "development") console.log(error);
    } finally {
      apiClient.removeTokens();
    } 
  }
  /* automatically login user upon refresh if refresh and access tokens
    are available in local storage */
  useEffect(() => {
    function isString(value) {
      return typeof value === "string";
    }

    async function login() {
      const responseUserData = await apiClient.loginWithToken();
      if (responseUserData.username) {
        const responseUserProfileData = await apiClient.getUserProfile(
          responseUserData.username
        );
        setUserData(responseUserData);
        setUserProfile(responseUserProfileData);
        setIsUserAuthed(true);
      }
    }
    const tokenString = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (tokenString != "undefined" && isString(tokenString)) {
      const tokens = JSON.parse(tokenString);
      apiClient.setTokens(tokens);
      login();
    }
    setIsLoading(false);
  }, []);

  const authVariables = {
    userData,
    isUserAuthed,
    isLoading,
    userProfile,
    errorMsg,
    setUserData,
    setUserProfile,
    loginUser,
    registerUser,
    logoutUser,
    setErrorMsg,
  };
  return (
    <AuthContext.Provider value={authVariables}>
      {children}
    </AuthContext.Provider>
  );
}

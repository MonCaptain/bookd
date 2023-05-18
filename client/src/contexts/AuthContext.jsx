import axios from "axios";
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

export const userTokensTemplate = {
  refresh: "",
  access: "",
};

export function AuthContextProvider({ children }) {
  const [userTokens, setUserTokens] = useState(userTokensTemplate);
  const [userData, setUserData] = useState(userDataTemplate);
  const [isUserAuthed, setIsUserAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function loginUser(loginForm) {
    try {
      const tokensData = await apiClient.login(loginForm);
      // set tokens state to contain the response data
      setUserTokens({ ...tokensData });
      /* put tokens in local storage to use for login persistance. 
      (the following two lines do the same thing, will delete one of them later) */
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokensData));
      apiClient.setTokens(tokensData);
      // finally, login the user using the tokens
      if (tokensData.access != undefined) {
        setIsUserAuthed(true);
        setUserData(await apiClient.loginWithToken());
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function registerUser(registerForm) {
    try {
      await apiClient.register(registerForm);
      await loginUser({
        username: registerForm.username,
        password: registerForm.password,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function logoutUser() {
    try {
      await apiClient.logout();
      setUserData(userDataTemplate);
      setUserTokens(userTokensTemplate);
      setIsUserAuthed(false);
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    } catch (error) {
      console.log(error);
    }
  }
  /* automatically login user upon refresh if refresh and access tokens
    are available in local storage */
  useEffect(() => {
    function isString(value) {
      return typeof value === "string";
    }

    async function login() {
      setUserData(await apiClient.loginWithToken());
    }
    const tokenString = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (isString(tokenString)) {
      const tokens = JSON.parse(tokenString);
      setUserTokens(tokens);
      apiClient.setTokens(tokens);
      login();
      setIsUserAuthed(true);
    }
    setIsLoading(false);
  }, []);

  const authVariables = {
    userData,
    userTokens,
    isUserAuthed,
    isLoading,
    setUserData,
    loginUser,
    registerUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authVariables}>
      {children}
    </AuthContext.Provider>
  );
}

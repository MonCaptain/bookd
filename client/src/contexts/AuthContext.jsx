import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";

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
  async function loginUser(username, password) {
    try {
      const tokensResponse = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const tokensData = await tokensResponse.json();
      // set tokens state to contain the response data
      setUserTokens({ ...tokensData });
      /* put tokens in local storage to use for login persistance. 
      (the following two lines do the same thing, will delete one of them later) */
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokensData));
      // apiClient.setTokens(tokensData);

      // finally, login the user using the tokens
      loginWithToken(tokensData.access);
    } catch (error) {
      console.log(error);
    }
  }

  async function registerUser(registerForm) {
    try {
      await fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    const refreshToken = userTokens.refresh;
    const accessToken = userTokens.access;
    try {
      await fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      setUserData(userDataTemplate);
      setUserTokens(userTokensTemplate);
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    } catch (error) {
      console.log(error);
    }
  }

  async function loginWithToken(access) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      headers["Authorization"] = `Bearer ${access}`;
      const response = await axios({
        url: "users/me",
        method: "GET",
        data: {},
        headers: headers,
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  /* automatically login user upon refresh if refresh and access tokens
    are available in local storage */
  // useEffect(() => {
  //   const tokenString = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  //   if (isString(tokenString)) {
  //     const tokens = JSON.parse(tokenString);
  //     setUserTokens(tokens);
  //     apiClient.setTokens(tokens);
  //     loginWithToken(tokens.access);
  //   }
  // }, []);

  const authVariables = {
    userData,
    userTokens,
    isUserAuthed,
    setUserData,
    loginUser,
    registerUser,
    logoutUser
  }

  return (
    <AuthContext.Provider value={authVariables}>{children}</AuthContext.Provider>
  );
}

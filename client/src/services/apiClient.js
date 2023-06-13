import axios from "axios";

class ApiClient {
  constructor(baseUrl) {
    this.accessToken = "null";
    this.refreshToken = "null";
    this.LOCAL_STORAGE_AUTH_KEY = "local_storage_tokens_key";
    this.headers = {
      "Content-Type": "application/json",
    };
    this.baseUrl = baseUrl;
  }

  setTokens(tokens) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokens));
  }

  async apiRequest({ endpoint, method, requestBody = {} }) {
    if (this.accessToken !== "null" && endpoint !== "/users/register") {
      this.headers[`Authorization`] = `Bearer ${this.accessToken}`;
    }
    let requestInit;
    // if api call does not require a requestBody then exlclude the "body" attribute
    if (Object.keys(requestBody).length === 0) {
      requestInit = {
        method: method,
        headers: this.headers,
      };
    } else {
      requestInit = {
        method: method,
        headers: this.headers,
        body: JSON.stringify(requestBody),
      };
    }
    let requestUrl = this.baseUrl + endpoint;
    try {
      const response = await fetch(requestUrl, requestInit);
      return await response.json();
    } catch (error) {
      console.error(error.response);
    }
  }

  async login(loginForm) {
    return await this.apiRequest({
      endpoint: "/users/login",
      method: "POST",
      requestBody: loginForm,
    });
  }

  async loginWithToken() {
    return await this.apiRequest({
      endpoint: "/users/me",
      method: "GET",
    });
  }

  async register(registerForm) {
    return await this.apiRequest({
      endpoint: "/users/register",
      method: "POST",
      requestBody: registerForm,
    });
  }

  async logout() {
    return await this.apiRequest({
      endpoint: "/users/logout",
      method: "POST",
      requestBody: { refresh: this.refreshToken },
    });
  }

  async postBook(bookObject) {
    return await this.apiRequest({
      endpoint: "/books/",
      method: "POST",
      requestBody: bookObject,
    });
  }

  async retrieveUsername() {
    let response = await this.apiRequest({
      endpoint: "/users/me",
      method: "GET",
    });
    return response.username;
  }

  async postEntry(bookID) {
    let username = await this.retrieveUsername();
    return await this.apiRequest({
      endpoint: `/books/${username}/entries`,
      method: "POST",
      requestBody: bookID,
    });
  }

  async editEntry(entryID, entryObject) {
    let username = await this.retrieveUsername();
    return await this.apiRequest({
      endpoint: `/books/${username}/entries/${entryID}`,
      method: "PATCH",
      requestBody: entryObject,
    });
  }

  // retrieve all user profiles
  async getAllUserProfiles() {
    return await this.apiRequest({
      endpoint: "/users/",
      method: "GET",
    });
  }

  // retrieve user profile
  async getUserProfile(username) {
    return await this.apiRequest({
      endpoint: `/books/${username}`,
      method: "GET",
    });
  }

  async editProfile(username, profileSettings) {
    return await this.apiRequest({
      endpoint: `/books/${username}`,
      method: "PATCH",
      requestBody: {
        ...profileSettings,
      },
    });
  }

  async uploadProfilePicture(username, data) {
    let form_data = new FormData();
    form_data.append("profile_picture", data.image_url, data.image_url.name);
    await axios
      .patch(`http://localhost:8000/books/${username}`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async retrieveEntries() {
    let username = await this.retrieveUsername();
    return await this.apiRequest({
      endpoint: `/books/${username}/entries`,
      method: "GET",
    });
  }

  async deleteEntry(entryID) {
    let username = await this.retrieveUsername();
    return await this.apiRequest({
      endpoint: `/books/${username}/entries/${entryID}`,
      method: "DELETE",
    });
  }
}

export default new ApiClient("http://localhost:8000");

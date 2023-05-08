class ApiClient {
  constructor(baseUrl) {
    this.accessToken = "null";
    this.refreshToken = "null";
    this.LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    this.baseUrl = baseUrl;
  }

  setTokens(tokens) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokens));
  }

  async apiRequest({ endpoint, method, requestBody = {} }) {
    if (this.accessToken !== "null") {
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

  
  async login(loginForm){
    return await this.apiRequest({
      endpoint:"/users/login",
      method:"POST",
      requestBody:loginForm
    })
  }
  
  async loginWithToken(){
    return await this.apiRequest({
      endpoint:"/users/me",
      method:"GET",
    })
  }

  async register(registerForm){
    return await this.apiRequest({
      endpoint:"/users/register",
      method:"POST",
      requestBody:registerForm
    })
  }

  async logout(){
    return await this.apiRequest({
      endpoint:"/users/logout",
      method:"POST",
    })
  }
}

export default new ApiClient("http://localhost:8000");

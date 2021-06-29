import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "student_store_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      console.log('AXIOS CALL',{ url, method, data, headers });

      console.log('DATA: ',data);


      const res = await axios({ url, method, data, headers });

      console.log('AXIOS RES',res.data);

      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      console.log(message,error);
      console.log({ data: null, err: message || String(error) });
      return { data: null, err: message || String(error) };
    }
  }
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

  async loginUser(credentials) {
    return await this.request({
      endpoint: "auth/login/",
      method: "POST",
      data: credentials,
    });
  }
  async signupUser(credentials) {
    console.log('credentials',credentials);
    const res = await this.request({
      endpoint: "auth/register/",
      method: "POST",
      data: credentials,
    });
    console.log('res',res);
    return res
  }
  async getProducts() {
    return await this.request({ endpoint: "store/", method: "GET" });
  }
  async postOrder(credentials) {
    return await this.request({
      endpoint: "orders/",
      method: "POST",
      data: credentials,
    });
  }
}

export default new ApiClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);

import axios from "axios";
import qs from "qs";
import router from "@/router";

// DEFAULT CONFIG

const config = {
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
};

// INSTANCE
const $axios = axios.create(config);

// SET TOKEN
// Allows to set the token of axios instance after login
const setToken = (token) => {
  $axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const setParams = (params) => {
  $axios.defaults.params = params;
};

// TOKEN
// Add token to header if found in localStorage
const token = localStorage.getItem("admin-token");
if (token) setToken(token);

// INTERCEPTORS
$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin-token");
      router.replace({ name: "login" });
    }
    //If status is not provided, axios is not sure what happend!
    if (!error.response && !error.status) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error.response);
    }
  }
);

export default $axios;
export { setToken, setParams };

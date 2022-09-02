import router from "@/router";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
});

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      router.push("/logout");
    }
    return Promise.reject(error.response);
  }
);

export default api;

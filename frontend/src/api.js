//interceptor - intercepts requests and automatically adds the correct headers reducing redunduncy
//axios intercepter
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";


//this avoids us from having to specify the base URL...since we are importing it from .env ln 1
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, //to load an environemnt variable in this js it needs to start with VITE
});//Allows us to import anything that is specified inside an environment variable file

//inside this arrow function we accept config and look inside our local storage to check for access token...if true added as authorization header to request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;//backticks
    }//passing jwt access token! create authorization header (handled by axios) then syntac on the `Bearer ${tk}` syntax
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
//rather than using axios directly we will now be using api object to do axios role. neat!
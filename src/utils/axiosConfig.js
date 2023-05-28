import axios from "axios";
const getTokenfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenfromLocalStorage !== null ? getTokenfromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // paramsSerializer: params => queryString.stringify(params),
});

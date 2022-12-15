import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3052/",
  timeout: 1000000000,
  headers: {
    "Content-Type": "application/json",
  },
});

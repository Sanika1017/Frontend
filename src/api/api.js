import axios from "axios";

const API = axios.create({
  baseURL: "https://backend1-q42h.onrender.com/api",
});

export default API;

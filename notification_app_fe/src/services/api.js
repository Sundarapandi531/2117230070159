import axios from "axios";

const API = axios.create({
  baseURL: "/evaluation-service",
});

export default API;
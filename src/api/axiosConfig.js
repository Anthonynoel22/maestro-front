import axios from "axios";
import { configure } from "axios-hooks";

const API_URL = "http://localhost:3000/api";

const api_axios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
configure({ api_axios });
export default api_axios;

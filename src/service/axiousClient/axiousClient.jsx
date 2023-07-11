import axios from "axios";

const axiousClient = axios.create({
    withCredentials: true,
});

export default axiousClient;
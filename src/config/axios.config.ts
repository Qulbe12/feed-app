import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://vehicle-app-be.vercel.app/",
    headers: {
        Accept: "application/json",
    },
});

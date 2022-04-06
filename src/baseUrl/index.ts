import axios from "axios";

export const http = axios.create({
    // baseURL: "http://hifl-staging.herokuapp.com/api/v1"
    baseURL: process.env.REACT_APP_URL
})

export const privateHttp = axios.create({
    // baseURL: "http://hifl-staging.herokuapp.com/api/v1"
    baseURL: process.env.REACT_APP_URL
})

privateHttp.interceptors.request.use((config: any) => {
    config.headers.Authorization =   `Bearer ${sessionStorage.getItem("token")}`
    return config
})
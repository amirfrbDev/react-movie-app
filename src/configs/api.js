import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;
    return request
})

export default api
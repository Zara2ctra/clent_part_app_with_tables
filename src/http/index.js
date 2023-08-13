import axios from "axios";

const $host = axios.create({
    baseURL: "https://server-part-app-with-tables.onrender.com"
})



const $authHost = axios.create({
    baseURL: "https://server-part-app-with-tables.onrender.com",
})

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
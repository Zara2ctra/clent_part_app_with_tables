import axios from "axios";

const $host = axios.create({
    baseURL: "https://vocal-elf-f9c831.netlify.app",
})



const $authHost = axios.create({
    baseURL: "https://vocal-elf-f9c831.netlify.app",
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

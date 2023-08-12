import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (email, password, last_login_date) => {
    const {data} = await $host.post('api/user/login', {email, password, last_login_date})
    if (data.token) {
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }
}

export const removeRow = async (id) => {
    await $authHost.post(`api/user/id`, {id});
}

export const removeAll = async () => {
    await $authHost.post(`api/user/id/all`);
}

export const changeUserStatus = async (id) => {
    await $authHost.post(`api/user/block/`, {id})
};

export const blockAll = async () => {
    await $authHost.post(`api/user/block/all`)
};


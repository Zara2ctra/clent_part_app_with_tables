import {makeAutoObservable} from "mobx";

export default class User {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._id = false;
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(bool) {
        this._isAuth = bool;
    }

    setId(id) {
        this._id = id;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get id() {
        return this._id;
    }
}
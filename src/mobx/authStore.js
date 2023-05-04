import { makeAutoObservable, configure } from "mobx";
import { auth, logout, registration } from "../API/authService";
import axios from "axios";
import { URL } from "../API/API";
import { tokenStore } from "./token";

configure({enforceActions: 'observed'})

class Auth {
    user = {};
    isLogin = false;
    language = localStorage.getItem('language') || 'ru';

    constructor() {
        makeAutoObservable(this);
    }

    setLogin(isLogin) {
        this.isLogin = isLogin;
    }

    getUser() {
        return this.user
    }

    setUser(user) {
        this.user = user;
    }

    setLanguage(language) {
        this.language = language;
    }

    async auth(email, password) {
        try {
            const response = await auth(email, password);
            tokenStore.setToken(response.data.accessToken);
            this.setLogin(true);
            this.setUser(response.data.user);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async register(email, password) {
        try {
            const response = await registration(email, password);
            tokenStore.setToken(response.data.accessToken);
            this.setLogin(true);
            this.setUser(response.data.user);
            return response;
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await logout();
            tokenStore.setToken(null)
            this.setLogin(false);
            this.setUser({});
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async updateAuth() {
        try {
            const response = await axios.get(`${URL}refresh`, {withCredentials: true});
            tokenStore.setToken(response.data.accessToken);
            this.setLogin(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log('-------------error---------------')
            console.log(e);
        }
    }
}

export const authStore = new Auth();
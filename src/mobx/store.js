import { makeAutoObservable } from "mobx";
import { auth, logout, registration } from "../API/authService";
import axios from "axios";
import API from "../API/API";

export default class Store {
    user = {};
    isLogin = false;
    language = localStorage.getItem('language') || 'ru';

    constructor() {
        makeAutoObservable(this);
    }

    setLogin(isLogin) {
        this.isLogin = isLogin;
    }

    setUser(user) {
        this.user = user;
    }

    setLanguage(language) {
        this.language = language;
    }

    async auth(email, password) {
        try {
            console.log(11111111111111111111111)
            const response = await auth(email, password);
            console.log('store.auth.resp = ', response)
            localStorage.setItem('access', response.data.accessToken);
            this.setLogin(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    async register(email, password) {
        try {
            const response = await registration(email, password);
            localStorage.setItem('access', response.data.accessToken);
            console.log('store.rega.resp = ', response);
            this.setLogin(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await logout();
            localStorage.removeItem('access');
            this.setLogin(false);
            this.setUser({});
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API}refresh`, {withCredentials: true});

            localStorage.setItem('access', response.data.accessToken);
            this.setLogin(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }
}
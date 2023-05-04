import { makeAutoObservable, configure } from "mobx";

configure({enforceActions: 'observed'})

class Token {
    token = null;

    constructor() {
        makeAutoObservable(this);
    }

    setToken(token) {
        this.token = token;
    }
}
export const tokenStore = new Token();
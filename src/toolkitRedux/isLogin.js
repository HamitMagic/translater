import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {isLogin: false};

export const logout = createAction(false);
export const login = createAction(true);

export default createReducer(initialState, {
    [login]: function (state) {
        state.isLogin = true;
    },
    [logout]: function (state) {
        state.isLogin = false;
    },
});
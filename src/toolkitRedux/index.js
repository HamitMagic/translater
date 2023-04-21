import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitReducer from "./toolkitReducer";
import isLogin from "./isLogin";

const rootReducer = combineReducers(
    {
        toolkit: toolkitReducer,
        login: isLogin,
    }
)

export const store = configureStore(
    {
        reducer: rootReducer,
    }
)
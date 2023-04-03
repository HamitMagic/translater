import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitLanguage from "./toolkitLanguage";
import toolkitReducer from "./toolkitReducer";

const rootReducer = combineReducers(
    {
        toolkit: toolkitReducer
    }
)

export const store = configureStore(
    {
        reducer: rootReducer,
    }
)
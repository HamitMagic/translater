import { createAction, createReducer } from "@reduxjs/toolkit";

const html = document.querySelector('html');
const [ru, kaz, en, es] = ['ru', 'kk', 'en', 'es'];

const initialState = {
    dictionaryKey: localStorage.getItem('language') || ru
}

export const russian = createAction(ru);
export const english = createAction(en);
export const kazakh = createAction(kaz);
export const spain = createAction(es);

function setLanguage(lang) {
    try {
        localStorage.setItem('language', lang)
    } catch (error) {
        console.log(error.message)
    }
}

export default createReducer(initialState, {
    [russian]: function (state) {
        state.dictionaryKey = ru;
        setLanguage(ru)
        html.lang = ru;
    },
    [english]: function (state) {
        state.dictionaryKey = en;
        setLanguage(en)
        html.lang = en;
    },
    [kazakh]: function (state) {
        state.dictionaryKey = kaz;
        setLanguage(kaz)
        html.lang = kaz;
    },
    [spain]: function (state) {
        state.dictionaryKey = es;
        setLanguage(es)
        html.lang = es;
    }
});
import { createSlice } from "@reduxjs/toolkit";

const [ru, kaz, en, es] = ['ru', 'kk', 'en', 'es'];
const html = document.querySelector('html')

function setLanguage(lang) {
    try {
        localStorage.setItem('language', lang)
    } catch (error) {
        console.log(error.message)
    }
}

const toolkitLanguage = createSlice({
    name: 'language',
    initialState: {
        initialLang: localStorage.getItem('language') ?? ru,
        language: es,
        tranlateableLanguage: en,
    },
    reducers: {

        // setInitialLang(state) {
        //     console.log(ru)
        //     state.initialLang = ru;
        //     setLanguage(ru)
        //     html.lang = ru;
        // },
        setEnglish(state) {
            state.initialLang = en;
            setLanguage(en)
            html.lang = en;
        },
        setKazakh(state) {
            state.initialLang = kaz;
            setLanguage(kaz)
            html.lang = kaz;
        },
        setRussian(state) {
            state.initialLang = ru;
            setLanguage(ru)
            html.lang = ru;
        },
        setSpanish(state) {
            state.initialLang = es;
            setLanguage(es)
            html.lang = es;
        },
    }
});


export default toolkitLanguage.reducer;
export const {setEnglish, setKazakh, setRussian, setSpanish} = toolkitLanguage.actions
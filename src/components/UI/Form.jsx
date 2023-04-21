import React, { useState } from 'react';
import MyButton from './MyButton';
import dictionary from '../../../assets/dictinary.json';
import { useSelector } from 'react-redux';
import classes from '../styles/form.module.css'

function Form({callback, fromLanguage, toLanguage, setToLanguage, setFromLanguage}) {
    const language = useSelector (state => {
        return state.toolkit.dictionaryKey;
    });
    const [inputText, setInputText] = useState('');

    function sendRequest(e) {
        e.preventDefault();
        setInputText('');
        callback();
    }

    return (
        <form className={classes.form} onSubmit={(e) => sendRequest(e)}>
            <input onChange={(e) => setInputText(e.target.value)} type='text' value={inputText}/>
            {dictionary[language].translateFrom}
            <select defaultValue={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                    <option value='ru'>russian</option>
                    <option value='en'>english</option>
                    <option value='kk'>kazakh</option>
                    <option value='es'>spanish</option>
            </select>
            {dictionary[language].translateTo}
            <select defaultValue={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                    <option value='ru'>russian</option>
                    <option value='en'>english</option>
                    <option value='kk'>kazakh</option>
                    <option value='es'>spanish</option>
            </select>
            <MyButton type='submit' text={dictionary[language].create} />
        </form>
    );
}

export default Form;
import React, { useState } from 'react';
import MyButton from './MyButton';
import dictionary from '../../../assets/dictinary.json';
import { useSelector } from 'react-redux';
import classes from '../styles/form.module.css'

function Form({callback}) {
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
            <MyButton type='submit' text={dictionary[language].create} />
        </form>
    );
}

export default Form;
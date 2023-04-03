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

    return (
        <form className={classes.form} onSubmit={(e) => callback(e, inputText)}>
            <input onChange={(e) => setInputText(e.target.value)} type='text' />
             
            <MyButton type='submit' text={dictionary[language].create} />
        </form>
    );
}

export default Form;
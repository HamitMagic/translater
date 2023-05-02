import React, { useContext, useState } from 'react';
import MyButton from './MyButton';
import dictionary from '../../../assets/dictinary.json';
import classes from '../styles/form.module.css'
import { Context } from '../../main';

function Form({callback, fromLanguage, toLanguage, setToLanguage, setFromLanguage}) {
    const {store} = useContext(Context);
    const [inputText, setInputText] = useState('');

    function sendRequest(e) {
        e.preventDefault();
        callback();
        setInputText('');
    }

    return (
        <form className={classes.form} onSubmit={(e) => sendRequest(e)}>
            <input onChange={(e) => setInputText(e.target.value)} type='text' value={inputText}/>
            {dictionary[store.language].translateFrom}
            <select defaultValue={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                    <option value='ru'>russian</option>
                    <option value='en'>english</option>
                    <option value='kk'>kazakh</option>
                    <option value='es'>spanish</option>
            </select>
            {dictionary[store.language].translateTo}
            <select defaultValue={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                    <option value='ru'>russian</option>
                    <option value='en'>english</option>
                    <option value='kk'>kazakh</option>
                    <option value='es'>spanish</option>
            </select>
            <MyButton type='submit' text={dictionary[store.language].create} />
        </form>
    );
}

export default Form;
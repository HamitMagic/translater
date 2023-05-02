import React, { useLayoutEffect, useEffect, useState, useContext } from 'react';
import MyButton from './MyButton';
import formClasses from '../styles/form.module.css'
import loginClasses from '../styles/login.module.css'
import dictionary from '../../../assets/dictinary.json';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

function LoginForm() {
    const {store} = useContext(Context);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [registrate, setRegistrate] = useState(false);
    const [isFilled, setFilled] = useState(false);

    useEffect(() => {
        if (registrate) {
            store.register(userEmail, userPassword);
        }
        else {
            store.auth(userEmail, userPassword);
        }
        setUserEmail('');
        setUserPassword('');
        setFilled(false);
        console.log('useEffect')
    }, [isFilled])



    return (
        <>
        <form className={formClasses.form, loginClasses.form} 
            onSubmit={(e) => {
                e.preventDefault();
                if (userEmail && userPassword) setFilled(true);
                else alert('заполинте все поля')
            }}
        >
            {store.isLogin ? `Вы авторизовались` : <input type='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />}
            {!store.isLogin && <input type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />}
            <div className={formClasses.buttons}>
                
                <MyButton type='submit' 
                    onClick={(e) => {
                        e.preventDefault();
                        setRegistrate(false);
                        e.stopPropagation();
                        // store.auth(userEmail, userPassword);
                    }} 
                    text={store.isLogin 
                        ? dictionary[store.language].logout 
                        : dictionary[store.language].login}
                />
                {!store.isLogin && <MyButton type='submit' 
                    onClick={(e) => {
                        e.preventDefault();
                        setRegistrate(true);
                        e.stopPropagation();
                        // store.register(userEmail, userPassword);
                    }}
                    text={dictionary[store.language].registrate}
                />}
                <button type='button' onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(isFilled, store.isLogin);
                }}></button>
            </div>
        </form>
        </>

    );
}

export default observer(LoginForm);
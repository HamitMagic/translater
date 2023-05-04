import React, { useState } from 'react';
import MyButton from './MyButton';
import formClasses from '../styles/form.module.css'
import loginClasses from '../styles/login.module.css'
import dictionary from '../../../assets/dictinary.json';
import { observer } from 'mobx-react-lite';
import Password from './Password';
import { authStore } from '../../mobx/authStore';

function LoginForm() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPassword2, setUserPassword2] = useState('');
    const [registrate, setRegistrate] = useState(false);
    const [logout, setLogout] = useState(false)

    function submitHandler(registrate, logout) {
        if (logout) {
            authStore.logout();
            return;
        }

        if (!userEmail && !userPassword) {
            alert('заполните все поля');
            return
        }
        else if (registrate === true) {
            if (userPassword !== userPassword2) {
                alert('пароли не совпадают');
                return;
            }
            authStore.register(userEmail, userPassword);
        }
        else authStore.auth(userEmail, userPassword);
        setUserEmail('');
        setUserPassword('');
        setUserPassword2('');
    }

    function showPassword(element) {
        if (element.value) {
            element.type = 'text';
            setTimeout(() => {
                element.type = 'password';
            }, 4000);
        }
    }

    return (
        <>
            <form className={formClasses.form, loginClasses.form} 
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler(registrate, logout);
                }}>
                {authStore.isLogin && `Вы авторизовались как ${authStore.getUser().email}`}
                <div >
                    {!authStore.isLogin && <input placeholder='E-mail' type='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />}
                    {!authStore.isLogin && <input type='password' placeholder='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />}
                    {!authStore.isLogin && <Password id="show_password" callback={showPassword} text='показать пароль' />}
                    {registrate && !authStore.isLogin && <input type='password' placeholder='confirm password' value={userPassword2} onChange={(e) => setUserPassword2(e.target.value)} />}
                </div>
                <div className={formClasses.buttons}>
                    <MyButton type='button'
                        callback={setLogout}
                        logout={authStore.isLogin ? logout : true}
                        text={registrate ?
                            dictionary[authStore.language].registrate 
                            : authStore.isLogin ?
                                dictionary[authStore.language].logout 
                                : dictionary[authStore.language].login}
                    />
                </div>
            </form>
            {!authStore.isLogin && <button 
                onClick={() => {
                    setRegistrate(!registrate);
                }}
            >
                {registrate ? dictionary[authStore.language].login : dictionary[authStore.language].registrate}
            </button>}
        </>
    )
}

export default observer(LoginForm);
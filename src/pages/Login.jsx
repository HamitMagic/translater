import React from 'react';
import classes from '../components/styles/login.module.css'
import LoginForm from '../components/UI/LoginForm';
import { observer } from 'mobx-react-lite';

function Login() {
    return (
        <div className={classes.container}>
            <LoginForm />
        </div>
    );
}

export default observer(Login);
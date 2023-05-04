import React from 'react';
import classes from '../components/styles/login.module.css'
import LoginForm from '../components/UI/LoginForm';
import { useEffect, useLayoutEffect } from 'react';
import { authStore } from '../mobx/authStore';

function Login() {

    return (
        <div className={classes.container}>
            <LoginForm />
        </div>
    );
}

export default Login;
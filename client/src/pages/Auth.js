import React, {useState, useContext} from 'react';
import '../resources/styles/auth.css';
import {observer} from "mobx-react-lite";
import { Context } from "../index";
const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userStore} = useContext(Context);
    return (
        <div className='signup-wrapper'>
            <div className='signup'>
                <h2>Вход в систему</h2>
                <input
                onChange={e => setEmail(e.target.value)}
                type='text' placeholder="Email" />
                <input
                onChange={e => setPassword(e.target.value)}
                 type='password' placeholder="Password" />
                
                <button onClick={() => { userStore.login(email, password)}}>Войти</button>
                <span>Ещё нет аккаунта? |  <a>Зарегистрироваться</a></span>
            </div>
        </div>
       
    )
}

export default Auth;
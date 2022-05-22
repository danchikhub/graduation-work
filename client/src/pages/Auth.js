import React, {useState, useContext} from 'react';
import '../resources/styles/auth.css';
import {observer} from "mobx-react-lite";
import { Context } from "../index";
import {useNavigate} from "react-router-dom"
const Auth = () => {
    const history = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userStore} = useContext(Context);
    const [authError, setAuthError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const login = async () => {
        const response = await userStore.login(email, password)
        if(response.status != 200) {
            setAuthError(true)
            setErrorMessage(response.data.message)
        }else {
            history('/')
        }

    }
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
                 {authError ? <span>{errorMessage}</span> : ''}
                
                <button onClick={() => { login() }}>Войти</button>
                <span>Ещё нет аккаунта? |  <a>Зарегистрироваться</a></span>
            </div>
        </div>
       
    )
}

export default Auth;
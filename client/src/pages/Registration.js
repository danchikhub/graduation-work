import React, {useState, useContext} from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import UserStore from "../store/userStore";
import '../resources/styles/registration.css';
import {observer} from "mobx-react-lite";
import { Context } from "../index";
import { useInRouterContext } from "react-router-dom";
import { Link } from 'react-router-dom';
const Registration = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userStore} = useContext(Context)
    return (
        <div className="registration-wrapper">
            <div className="registration">
                <h2>Зарегистрироваться</h2>
                <input
                 onChange={e => setFirstName(e.target.value)}
                 type="text" placeholder="Фамилия" name="" id="" />
                <input 
                onChange={e => setLastName(e.target.value)}
                type="text" placeholder="Имя" name="" id="" />
                <input
                onChange={e => setEmail(e.target.value)}
                type='text' placeholder="Почта" />
                <input 
                onChange={e => setPassword(e.target.value)}
                type='password' placeholder="Пароль" />
                <button onClick={() => { userStore.registration(first_name, last_name, email, password)}}>Зарегистрироваться</button>
                <span>Уже есть аккаунт? |  <Link className='get-reg' to="/login">Войти</Link></span>
            </div>
        </div>
    )

}

export default observer(Registration);
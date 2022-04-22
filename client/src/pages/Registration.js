import React, {useState, useContext} from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import UserStore from "../store/userStore";
import '../resources/styles/registration.css';
import {observer} from "mobx-react-lite";
import { Context } from "../index";
import { useInRouterContext } from "react-router-dom";

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
                 type="text" placeholder="First Name" name="" id="" />
                <input 
                onChange={e => setLastName(e.target.value)}
                type="text" placeholder="Last Name" name="" id="" />
                <input
                onChange={e => setEmail(e.target.value)}
                type='text' placeholder="Email" />
                <input 
                onChange={e => setPassword(e.target.value)}
                type='password' placeholder="Password" />
                <button onClick={() => { userStore.registration(first_name, last_name, email, password)}}>Войти</button>
                <span>Уже есть аккаунт? |  <a>Войти</a></span>
            </div>
        </div>
    )

}

export default observer(Registration);
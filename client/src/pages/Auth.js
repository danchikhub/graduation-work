import React, {useState, useContext} from 'react';
import '../resources/styles/auth.css';
import { Context } from "../index";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
const Auth = () => {
    const history = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userStore} = useContext(Context);
    const [authError, setAuthError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
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
                {...register("email",
                {
                    required: true,
                    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                })}
                onChange={e => setEmail(e.target.value)}
                type='email' 
                placeholder="Почта" />
                {errors?.email?.type === "required" && <p className="validate"> Поле объязательна для заполнения! </p>}
                {errors?.email?.type === "pattern" && <p className="validate"> Поле не валидна для почты! </p>}
                <input
                {
                    ...register("password", {
                        required: true,
                        minLength: 5
                    })}
                
                onChange={e => setPassword(e.target.value)}
                type='password' 
                placeholder="Пароль" />
                 {errors?.password?.type === "required" && <p className="validate"> Поле объязательна для заполнения! </p>}
                    {errors?.password?.type === "minLength" && (
                        <p className="validate">Пароль не должн быть меньше 5 символов! </p>
                    )}
                {authError ? <p className='auth-error'>{errorMessage}</p> : ''}
                
                <button onClick={handleSubmit(() => { login() })}>Войти</button>
                <span>Ещё нет аккаунта? |  <Link className='get-reg' to="/registration">Зарегистрироваться</Link></span>
            </div>
        </div>
       
    )
}

export default Auth;
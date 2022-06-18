import React, { useState, useContext } from "react";
import '../resources/styles/registration.css';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const history = useNavigate()
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userStore } = useContext(Context);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [authError, setAuthError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit = async () => {
        const response = await userStore.registration(first_name, last_name, email, password)

        if (response.status !== 200) {
            setAuthError(true)
            setErrorMessage(response.data.message)

        } else {
            history('/')
        }
    }
    return (
        <div className="registration-wrapper">
            <div className="registration">
                <h2>Зарегистрироваться</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {
                        ...register("firstName", {
                            required: true,
                            minLength: 2,
                        })}
                        onChange={e => setFirstName(e.target.value)}
                        type="text"
                        placeholder="Фамилия"
                    />
                    {errors?.firstName?.type === "required" && <p className="validate"> Поле объязательна для заполнения! </p>}
                    {errors?.firstName?.type === "minLength" && (
                        <p className="validate"> Фамилия не должна быть меньше 2 символов! </p>
                    )}
                    <input
                        {
                        ...register("lastName", {
                            required: true,
                            minLength: 2,
                        })}
                        onChange={e => setLastName(e.target.value)}
                        type="text" placeholder="Имя" />
                    {errors?.lastName?.type === "required" && <p className="validate"> Поле объязательна для заполнения! </p>}
                    {errors?.lastName?.type === "minLength" && (
                        <p className="validate"> Имя не должна быть меньше 2 символов! </p>
                    )}
                    <input
                        {
                        ...register("emailUser", {
                            required: true,
                            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                        })}
                        onChange={e => setEmail(e.target.value)}
                        type='text' placeholder="Почта" />
                    {errors?.emailUser?.type === "required" && <p className="validate"> Поле объязательна для заполнения! </p>}
                    {errors?.emailUser?.type === "pattern" && <p className="validate"> Поле не валидна для почты! </p>}
                    <input
                        {
                        ...register("password", {
                            required: true,
                            minLength: 5
                        })}
                        onChange={e => setPassword(e.target.value)}
                        type='password' placeholder="Пароль" />
                    {errors?.password?.type === "required" && <p className="validate"> Поле объязательна для заполнения! </p>}
                    {errors?.password?.type === "minLength" && (
                        <p className="validate">Пароль не должн быть меньше 5 символов! </p>
                    )}
                    {authError ? <p className='auth-error'>{errorMessage}</p> : ''}
                    <button type="submit">Зарегистрироваться</button>
                </form>





                <span>Уже есть аккаунт? |  <Link className='get-reg' to="/login">Войти</Link></span>
            </div>
        </div>
    )

}

export default observer(Registration);
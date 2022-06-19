import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import { fetchLevels, fetchUnivers } from "../http/request";
import CustomSelect from "../components/CustomSelect";
import CustomSelectUniver from "../components/CustomSelectUniver";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import '../resources/styles/instructor-reg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IstructorRegistration = () => {
    const history = useNavigate()
    const {userStore} = useContext(Context);
    const [levels, setLevels] = useState([]);
    const [univers, setUnivers] = useState([]);
    const [contactEmail, setContactEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [biography, setBiography] = useState('');
    const [university, setUniversity] = useState(0);
    const { register, handleSubmit, formState: { errors, isValid }, watch, reset } = useForm();
    useEffect(() => {
        fetchLevels().then(data => setLevels(data));
        fetchUnivers().then(data => setUnivers(data));
    }, [])
    const [selectUnivers, setSelectUnivers] = useState(univers);

    const onLevelsSelectChange = e => {
        const levelId = parseInt(e.target.options[e.target.selectedIndex].value);
        const univer = univers.filter(item => item.univer_level === levelId);
        setSelectUnivers(univer);

    }
    const onUniverSelectChange = e => {
        const univer_id = e.target.options[e.target.selectedIndex].value;
        console.log(univer_id)
        setUniversity(univer_id)
    }
    const notify = (text) => toast(text);
    <CustomSelect id="level" options={levels} onSelect={onLevelsSelectChange}></CustomSelect>
    return (
        <div className="instructor-reg">
            <div className="container">
                <h2>Регистрация</h2>
                <div className="instructor-wrapper">
                    <div className="left-block">
                        <label className='course-label' htmlFor="">Электронная почта:</label>
                        <input 
                         {
                            ...register("mail", {
                                required: true
                            })
                            }
                        type="text" onChange={e => setContactEmail(e.target.value)} placeholder="Email" />
                        {errors?.mail?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>}
                        <label className='course-label' htmlFor="">Номер телефона:</label>
                        <input 
                        {
                            ...register("phone", {
                                required: true
                            })
                            }
                        type="tel" onChange={e => setTelephone(e.target.value)} placeholder="Номер телефона" />
                        {errors?.phone?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>}
                        <label className='course-label' htmlFor="">Выбрать уровень образования:</label>
                        <CustomSelect id="level" options={levels} onChange={onLevelsSelectChange} styleClass={"select-instructor"}></CustomSelect>
                        <label className='course-label' htmlFor="">Выберите учебное заведение:</label>
                        <CustomSelectUniver id="univer" options={selectUnivers} onChange={onUniverSelectChange}  styleClass={"select-instructor"}></CustomSelectUniver>
                        
                    </div>
                    <div className="right-block">
                        <label className='course-label' htmlFor="">Автобиография:</label>
                        <textarea 
                        {
                            ...register("bi", {
                                required: true
                            })
                            }
                        onChange={e => setBiography(e.target.value)} placeholder="Ваш текст" className="biography" cols="30" rows="10"></textarea>
                        {errors?.bi?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>}
                        <button onClick={handleSubmit(() => {
                            userStore.instructorRegistration(contactEmail, telephone, biography, university, userStore.user.id)
                            notify("Регистрация прошла успешно!")
                            history('/')
                        })}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>


    )

}

export default IstructorRegistration;
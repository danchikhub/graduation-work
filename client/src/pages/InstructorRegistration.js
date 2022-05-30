import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import { fetchLevels, fetchUnivers } from "../http/request";
import CustomSelect from "../components/CustomSelect";
import CustomSelectUniver from "../components/CustomSelectUniver";
import '../resources/styles/instructor-reg.css';
const IstructorRegistration = () => {
    const {userStore} = useContext(Context);
    const [levels, setLevels] = useState([]);
    const [univers, setUnivers] = useState([]);
    const [contactEmail, setContactEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [biography, setBiography] = useState('');
    const [university, setUniversity] = useState(0);
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
    <CustomSelect id="level" options={levels} onSelect={onLevelsSelectChange}></CustomSelect>
    return (
        <div className="instructor-reg">
            <div className="container">
                <h2>Регистрация</h2>
                <div className="instructor-wrapper">
                    <div className="left-block">
                        <input type="text" onChange={e => setContactEmail(e.target.value)} placeholder="Email" name="" id="" />
                        <input type="tel" onChange={e => setTelephone(e.target.value)} placeholder="Номер телефона" name="" id="" />
                        <CustomSelect id="level" options={levels} onChange={onLevelsSelectChange} styleClass={"select-instructor"}></CustomSelect>
                        <CustomSelectUniver id="univer" options={selectUnivers} onChange={onUniverSelectChange}  styleClass={"select-instructor"}></CustomSelectUniver>
                        
                    </div>
                    <div className="right-block">
                        <textarea onChange={e => setBiography(e.target.value)} placeholder="Ваш текст" className="biography" name="" id="" cols="30" rows="10"></textarea>
                        <button onClick={() => {
                            userStore.instructorRegistration(contactEmail, telephone, biography, university, userStore.user.id)
                            
                        }}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default IstructorRegistration;
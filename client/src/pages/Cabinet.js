import React, {useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Aside from '../components/aside/Aside';
import {FaEdit} from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { fetchCoursesPanel } from '../http/request';
import { Context } from "../index";
import {useNavigate} from "react-router-dom";
import Modal from '../components/modal/Modal';
import '../resources/styles/cabinet.css'
import { deleteCourse } from '../services/CourseService';
import { observer } from 'mobx-react-lite';
const Cabinet = observer(() => {
    const [courses, setCourses] = useState([])
    const {userStore} = useContext(Context)
    const [modalActive, setModalActive] = useState(false)
    const [course, setCourse] = useState({})
    const history = useNavigate()
    useEffect(() => {
        fetchCoursesPanel(userStore.user.id).then(data => setCourses(data))
    }, [])
    
    const courseDelete = () => {
        deleteCourse(course.id)
        fetchCoursesPanel(userStore.user.id).then(data => setCourses(data))
        setModalActive(false)
    }
    return (
        <div className='cabinet-wrapper'>
            <div className="aside-inner">
                <Aside></Aside>
            </div>
            
            <table id="region" class="region">
            <tr>
                <th colspan="11"> Курсы</th>
            </tr>
            <tr>
                
                <td>№</td>
                <td>Название</td>
                <td>Учебное задедение</td>
               
                <td>Категория</td>
                
                <td colspan="2"></td>
                
            </tr>
            {
                courses.map((item, index) => {
                    return <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.course_title}</td>
                        <td>{item.univer_name}</td>
                        
                        <td>{item.category_name}</td>
                        <td onClick={() => history("/edit" + "/" + item.id)}><FaEdit/></td>
                        <td><span onClick={() => {setModalActive(true); setCourse(item)}}><MdDeleteOutline/></span></td>
                    </tr>
                })
            }
           
           
        </table>
        <Modal active={modalActive} setActive={setModalActive}>
        <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => courseDelete()} >Удалить</button><button onClick={() => setModalActive(false) }>Отмена</button></div>
        </Modal>
        </div>
        
    )
})

export default Cabinet;
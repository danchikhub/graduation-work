import React, { useEffect, useState } from "react";
import AdminAside from "../components/admin-aside/AdminAside";
import { fetchCourses } from '../http/request';
import { MdDeleteOutline } from "react-icons/md";
import { deleteCourse } from "../services/CourseService";
import Modal from "../components/modal/Modal";

const CourseAdmin = () => {
    const [courses, setCourses] = useState([]);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [selectCourse, setSelectCourse] = useState({})
    useEffect(() => {
        fetchCourses(0, 0).then(data => setCourses(data))
    }, [courses])
    
    

   
    const courseDelete = (course_id) => {
        deleteCourse(course_id)
        fetchCourses(0, 0).then(data => setCourses(data))
        setModalDeleteActive(false)
    }
    
    return (
        <div className="lectureView-wrapper">
            <div className="aside-inner">
                <AdminAside />
            </div>
            <div className="lecture-block">
                <div className='lecture-block__create'>
                    <h2>Категории</h2>
                    
                </div>
                <div className="lecture-block__list">
                    <table id="region" class="region lecture-block">
                        <tr>
                            <th colspan="11">Курсы</th>
                        </tr>
                        <tr>

                            <td>№</td>
                            <td>Название</td>
                            <td>Учебное заведение</td>
                            <td colspan="1"></td>

                        </tr>
                        {
                            courses.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.course_title}</td>
                                    <td>{item.univer_name}</td>
                                    <td> <span onClick={() =>{setSelectCourse(item); setModalDeleteActive(true)}}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>
            </div>
           
            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => {courseDelete(selectCourse.id)}} >Удалить</button><button onClick={() => setModalDeleteActive(false) }>Отмена</button></div>
            </Modal>
        </div>
    )
}

export default CourseAdmin





import React, { useEffect, useState } from "react";
import Aside from "../components/aside/Aside";
import { useParams } from "react-router-dom";
import { fetchCourseOneEdit, fetchCategories, fetchThemes } from "../http/request";
import { updateCourse, updateTheme, deleteTheme } from "../services/CourseService";
import {FaEdit} from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../components/modal/Modal";
import { Link } from "react-router-dom";
import SelectComp from "../components/SelectComp";
import '../resources/styles/edit.css'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Edit = () => {
    const history = useNavigate()
    const { id } = useParams();
    const [course, setCourse] = useState({})
    const [categories, setCategories] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [themes, setThemes] = useState([])
    const [modalActive, setModalActive] = useState(false);
    const [deleteAcitve, setDeleteActive] = useState(false)
    const [theme, setTheme] = useState({})
    const [themeTitle, setThemeTitle] = useState('');
    const [themeDesc, setThemeDesc] = useState('');
    const [themeFile, setThemeFile] = useState(null);
    const selectThemeFile = e => {
        setThemeFile(e.target.files[0])
    }
    const selectFile = e => {
        setImgFile(e.target.files[0])
    }



    const handleInputChange = e => {
        const { name, value } = e.target
        setCourse({ ...course, [name]: value })
    }
    const handleThemeChange = e => {
        const { name, value } = e.target
        setTheme({ ...theme, [name]: value })
    }

    useEffect(() => {
        fetchCourseOneEdit(id).then(data => setCourse(data))
        fetchCategories().then(data => setCategories(data))
        fetchThemes(id).then(data => setThemes(data))
    }, [])


    const category = categories.find((item) => {

        return item.id === course.category_id
    })

    const courseUpdate = () => {

        const {id, course_img, course_title, course_desc } = course
        
        const formData = new FormData();
        imgFile == null ? formData.append('imgFile', course_img) : formData.append('imgFile', imgFile)
        formData.append('course_title', course_title)
        formData.append('course_desc', course_desc)
        formData.append('id', id)

        updateCourse(formData)
        fetchCourseOneEdit(id).then(data => setCourse(data))
    }

    const update = () => {
        console.log(theme)
        const {id, theme_title, theme_desc, theme_file} = theme
        const themeData = new FormData();
        themeFile == null ? themeData.append('theme_file', theme_file) : themeData.append('theme_file', themeFile)
        themeData.append('theme_id', id)
        themeData.append('theme_title', theme_title)
        themeData.append('theme_desc', theme_desc)
        
        updateTheme(themeData)
        
        setModalActive(false)
    }
    const themeDelete = () => {
        deleteTheme(theme.id)
        fetchThemes(id).then(data => setThemes(data))
        setDeleteActive(false)
    }
    const notify = (text) => toast(text);
    return (
        
        <div className="course-wrapper">
            <div className="aside-inner">
                <Aside />
            </div>
            <div className="course-create">
                <h1 className='course-create-title'>Обновление курса</h1>
                <div className="course-create_wrapper">
                    <div className="edit-wrapper">
                        <label className='course-label' htmlFor="">Картинка курса:</label>
                        <img src={process.env.REACT_APP_API_URL + course.course_img} alt="" />
                        <label className='course-label' htmlFor="">Выбрать новую картинку курса:</label>
                        <input onChange={selectFile} className='course-create_file' type="file" />
                        <label className='course-label' htmlFor="">Заголовок курса:</label>
                        <input  value={course.course_title} onChange={handleInputChange} type="text" name="course_title" />
                        <button onClick={() => { courseUpdate(); notify("Курс обновлен")  }}  className='course-create_button'>Обновить курс</button>
                        
                    </div>
                    <div>
                        <label className='course-label' htmlFor="">Описание курса:</label>
                        <textarea onChange={handleInputChange} name="course_desc" cols="30" rows="10" value={course.course_desc}></textarea>
                    </div>
                </div>
                <div className="theme-edit">
                <table id="region" class="region">
                <tr>
                        <th colspan="11">Темы курса</th>
                    </tr>
                    <tr>
                        
                        <td>№</td>
                        <td>Название темы</td>
                        <td>Файл</td>
                        <td colspan="2"></td>
                        
                    </tr>
                    {
                        themes.map((item, index) => {
                            return  <tr>
                        
                                <td>{index + 1}</td>
                                <td>{item.theme_title}</td>
                                <td><a href={process.env.REACT_APP_API_URL + item.theme_file} download target="_blank">Скачать</a></td>
                                <td > <span onClick={() => {setModalActive(true); setTheme(item)}}><FaEdit/></span> </td>
                                <td><span onClick={() => {setDeleteActive(true); setTheme(item)}}><MdDeleteOutline/></span></td>
                            
                            </tr>
                        })
                    }
                   
           
           
           
        </table>
                </div>
            </div>
            
            <Modal active={modalActive} setActive={setModalActive} >
                <input onChange={handleThemeChange} value={theme.theme_title} className="theme-input__title" name="theme_title" type="text" />
                <textarea onChange={handleThemeChange} value={theme.theme_desc} className="theme-input__desc" name="theme_desc" id="" cols="30" rows="10"></textarea>
                <p className="theme-file_title">{theme.theme_title}.pdf</p>
                <input onChange={selectThemeFile}  className="theme-input__title" type="file" />
                <div className="theme-buttons"><button onClick={() => {update();fetchThemes(id).then(data => setThemes(data)) }}>Изменить</button><button onClick={() => setModalActive(false) }>Отмена</button></div>
            </Modal>
            <Modal active={deleteAcitve} setActive={setDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => themeDelete()} >Удалить</button><button onClick={() => setModalActive(false) }>Отмена</button></div>
            </Modal>
            <ToastContainer />
        </div>

            )
}

            export default Edit;
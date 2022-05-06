import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aside from '../components/aside/Aside';
import { fetchCategories } from '../http/request';
import '../resources/styles/course-create.css'
import '../components/SelectComp';
import SelectComp from '../components/SelectComp';
// import CourseService from '../services/CourseService';
import { createCourse, createTheme } from '../services/CourseService';
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../index";

const Course = () => {
    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState(0);
    const [theme, setTheme] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const { userStore } = useContext(Context);
    const [active, setActive] = useState(false);
    const [themeActive, setThemeActive] = useState(false);
    const [themeTitle, setThemeTitle] = useState('');
    const [themeDesc, setThemeDesc] = useState('');
    const [themeFile, setThemeFile] = useState(null);
    const [course, setCourse] = useState({})
    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
    }, [])

    const selectFile = e => {
        setImgFile(e.target.files[0])
    }
    const selectThemeFile = e => {
        setThemeFile(e.target.files[0])
    }
    const onCategorySelectChange = e => {
        const category_id = e.target.options[e.target.selectedIndex].value;
        setCategory(category_id)
    }

  
    const addCourse = () => {
        const formData = new FormData();
        formData.append('imgFile', imgFile);
        formData.append('course_title', courseTitle)
        formData.append('course_desc', courseDesc)
        formData.append('category_id', category)
        formData.append('user_id', userStore.user.id)
        const course  = createCourse(formData).then(data => {setCourse(data)})
        
    }

    const addTheme = () => {

        const themeData = new FormData();
        themeData.append('course_id', course.id)
        themeData.append('theme_title', themeTitle)
        themeData.append('theme_desc', themeDesc)
        themeData.append('theme_file', themeFile)
        createTheme(themeData)
        
    }

    return (
        <div className="course-wrapper">
            <div className='aside-inner'>
                <Aside></Aside>
            </div>

            <div className="course-create">
                <div className="course-create_wrapper">
                    <div>
                        <input onChange={selectFile} className='course-create_file' type="file" name="" id="" />
                        <input onChange={(e) => setCourseTitle(e.target.value)} placeholder='Название курса' type="text" />
                        <SelectComp title={'Выберите категорию'} property={'category_name'} id="category" options={categories} onChange={onCategorySelectChange} />
                        <button onClick={() => { addCourse(); setActive(true) }} className='course-create_button'>Создать курс</button>
                        <button onClick={() => setThemeActive(true)} className={active ? "theme-create_button active" : "theme-create_button"}>Добавить темы</button>
                    </div>
                    <div>
                        <textarea onChange={(e) => setCourseDesc(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                    </div>

                </div>
                {/* {theme.map(i =>
                    <div className="theme-wrapper" key={i.number}>
                        <div >
                            <input className='theme-wrapper__input' type="text" onChange={(e) => changeTheme('title', e.target.value, i.number)} name="" id="" />
                            <input className='theme-wrapper__input' type="file" onChange={(e) => changeTheme('file', e.target.files[0], i.number)} />
                            <button>Добавить</button>
                        </div>

                        <textarea type="text" onChange={(e) => changeTheme('description', e.target.value, i.number)} name="" id="" />


                    </div>
                )} */}
                {
                    <div className={themeActive ? 'theme-wrapper active'  : 'theme-wrapper' }>
                        <div >
                            <input className='theme-wrapper__input' type="text" onChange={(e) => setThemeTitle(e.target.value)} name="" id="" />
                            <input className='theme-wrapper__input' type="file" onChange={selectThemeFile} />
                            <button onClick={() => addTheme()}>Добавить</button>
                        </div>

                        <textarea type="text" onChange={(e) => setThemeDesc(e.target.value)} name="" id="" />


                    </div>
                }

            </div>
        </div>

    )
}

export default Course;
import React, { useContext, useState, useEffect } from 'react';
import Aside from '../components/aside/Aside';
import { fetchCategories } from '../http/request';
import '../resources/styles/course-create.css'
import '../components/SelectComp';
import SelectComp from '../components/SelectComp';
import { createCourse, createTheme } from '../services/CourseService';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Context } from "../index";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const schema = yup.object().shape({
//     picture: yup.mixed()
//       .test('required', "Поле обязательно к заполнению! ", (value) =>{
//         return value && value.length
//       } )
//       .test("fileSize", "The file is too large", (value, context) => {
//         return value && value[0] && value[0].size <= 200000;
//       })
//       .test("type", "We only support jpeg", function (value) {
//         return value && value[0] && value[0].type === "image/jpeg";
//       }),
//   });

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
    const [course, setCourse] = useState({});
    const { register, handleSubmit, formState: { errors, isValid }, watch, reset } = useForm();
    const notify = (text) => toast(text);
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
        const course = createCourse(formData).then(data => { setCourse(data) })

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
                <h1 className='course-create-title'>Добавление нового курса</h1>
                <div className="course-create_wrapper">

                    <div>
                        <label className='course-label' htmlFor="">Выберите картинку курса:</label>
                        <input 
                             {
                                ...register("picture", {
                                    validate: {
                                        isFile: v => v.length !== 0 || "Вы не выбрали файл!",
                                        acceptedFormats: v =>  ['image/jpeg', 'image/png', 'image/gif'].includes(
                                            v[0]?.type
                                          ) || 'Выберите файл с расширением .png или jpeg'
                                    }
                                })}
                            onChange={selectFile} 
                            className='course-create_file' 
                            type="file" 
                        />
                         {errors.picture && <p className='validate file'>{errors.picture.message}</p>}
                        <label className='course-label' htmlFor="">Заголовок курса:</label>
                        <input
                            {
                                ...register("courseTitle", {
                                    required: true
                                })
                            }
                         onChange={(e) => setCourseTitle(e.target.value)} 
                         placeholder='Заголовок курса' 
                         type="text" 
                         />
                         {errors?.courseTitle?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>}
                        <label className='course-label' htmlFor="">Категория курса:</label>
                        <SelectComp 
                        name={"category"}
                        
                        title={'Выберите категорию'} 
                        property={'category_name'} 
                        id="category" 
                        options={categories} 
                        onChange={onCategorySelectChange} 
                        
                        />
                       
                        <button onClick={handleSubmit(() => { addCourse(); setActive(true);notify("Курс добавлен");})}  className='course-create_button'>Создать курс</button>
                        <button onClick={() => setThemeActive(true)} disabled={!active} className={active ? "theme-create_button active" : "theme-create_button"}>Добавить темы</button>
                    </div>
                    <div>
                        <label className='course-label' htmlFor="">Описание курса:</label>
                        <textarea 
                        {
                            ...register("courseDesc", {
                                required: true
                            })
                        }
                        onChange={(e) => setCourseDesc(e.target.value)} 
                        placeholder="Описание курса" 
                        cols="30" rows="10"></textarea>
                        {errors?.courseDesc?.type === "required" && <p className='validate file textarea'>Поле обязательно к заполнению!</p>}

                    </div>

                </div>

                {
                    <div className={themeActive ? 'theme-wrapper active' : 'theme-wrapper'}>
                        <div >
                            <label className='course-label' htmlFor="">Заголовок темы:</label>
                            <input
                            // {
                            //     ...register("themeTitle", {
                            //         required: true
                            //     })
                            // }
                            className='theme-wrapper__input' placeholder='Заголовок темы' type="text" onChange={(e) => setThemeTitle(e.target.value)} />
                             {/* {errors?.themeTitle?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>} */}
                            <label className='course-label' htmlFor="">Выберите файл темы:</label>
                            <input
                                //  {
                                //     ...register("file", {
                                //         validate: {
                                //             isFile: v => v.length !== 0 || "Вы не выбрали файл!",
                                //             acceptedFormats: v =>  ['application/pdf'].includes(
                                //                 v[0]?.type
                                //               ) || 'Выберите файл с расширением .pdf'
                                //         }
                                //     })}
                            className='theme-wrapper__input' type="file" onChange={selectThemeFile} />
                            {/* {errors.file && <p className='validate file'>{errors.file.message}</p>} */}
                            <button onClick={() => {addTheme(); notify("Тема добавлена")}}>Добавить тему</button>
                        </div>
                        <div>
                            <label className='course-label' htmlFor="">Описание темы:</label>
                            <textarea 
                            // {
                            //     ...register("themeDesc", {
                            //         required: true
                            //     })
                            // }
                            type="text" placeholder='Описание темы' onChange={(e) => setThemeDesc(e.target.value)} />
                            {/* {errors?.themeDesc?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>} */}
                        </div>



                    </div>
                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default Course;
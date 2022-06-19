import React, { useState, useContext, useEffect, useRef } from 'react';
import Aside from '../components/aside/Aside';
import { Context } from "../index";
import Modal from "../components/modal/Modal";
import SelectComp from '../components/SelectComp';
import { fetchCategories, fetchLecturesPanel, fetchLecture } from '../http/request';
import { createLecture, deleteLecture, updateLecture } from '../services/LectureService';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import '../resources/styles/lecture-create.css'
const LectureView = () => {
    const { register, handleSubmit, formState: { errors, isValid }, watch, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const [lectures, setLectures] = useState([]);
    const fileRef = useRef(null)
    const history = useNavigate()
    const { userStore } = useContext(Context);
    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
        fetchLecturesPanel(userStore.user.id).then(data => setLectures(data))

    }, [userStore.user.id])
    const lectureDelete = (id) => {
        deleteLecture(id)
        fetchLecturesPanel(userStore.user.id).then(data => setLectures(data))
        setModalDeleteActive(false)
    }
    const [lectureTitle, setLectureTitle] = useState('');
    const [lectureDesc, setLectureDesc] = useState('');
    const [category, setCategory] = useState(0);
    const [imgFile, setImgFile] = useState(null);
    const [lectureFile, setLectureFile] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    const [modalUpdateActive, setModalUpdateActive] = useState(false);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [lecture, setLecture] = useState({})

    const onCategorySelectChange = e => {
        const category_id = e.target.options[e.target.selectedIndex].value;
        setCategory(category_id)
    }
    const selectImg = e => {
        setImgFile(e.target.files[0])
    }
    const selectFile = e => {
        setLectureFile(e.target.files[0])
    }
    const handleInputChange = e => {
        const { name, value } = e.target
        setLecture({ ...lecture, [name]: value })
    }
    const addLecture = () => {
        const formData = new FormData();
        formData.append('imgFile', imgFile)
        formData.append('lecture_title', lectureTitle)
        formData.append('lecture_desc', lectureDesc)
        formData.append('category_id', category)
        formData.append('lectureFile', lectureFile)
        formData.append('user_id', userStore.user.id)
        createLecture(formData).then(data => { setLecture(data) })
    }

    const lectureUpdate = () => {

        const lectureData = new FormData();
        const { id, lecture_img, lecture_file, lecture_title, lecture_desc } = lecture
        lectureFile == null ? lectureData.append('lectureFile', lecture_file) : lectureData.append('lectureFile', lectureFile)
        imgFile == null ? lectureData.append('imgFile', lecture_img) : lectureData.append('imgFile', imgFile)
        lectureData.append('lecture_title', lecture_title)
        lectureData.append('lecture_desc', lecture_desc)
        lectureData.append('lecture_id', id)
        updateLecture(lectureData)
        fetchLecturesPanel(userStore.user.id).then(data => setLectures(data))
    }
    const fetchOneLecture = (id) => {
        fetchLecture(id).then(data => setLecture(data))
    }

    return (
        <div className="lectureView-wrapper">
            <div className="aside-inner">
                <Aside></Aside>
            </div>
            <div className="lecture-block">
                <div className='lecture-block__create'>
                    <h2>Лекции</h2>
                    <div>
                        <button onClick={() => setModalActive(true)} className='lecture-block__button'>Создать лекцию</button>
                    </div>
                </div>
                <div className="lecture-block__list">
                    <table id="region" class="region lecture-block">
                        <tr>
                            <th colspan="11">Лекции</th>
                        </tr>
                        <tr>

                            <td>№</td>
                            <td>Название</td>
                            <td>Учебное заведение</td>
                            <td>Категория</td>
                            <td colspan="3"></td>

                        </tr>
                        {
                            lectures.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.lecture_title}</td>
                                    <td>{item.univer_name}</td>

                                    <td>{item.category_name}</td>
                                    <td>
                                        <a onClick={() => history("/lecture-rewiew" + "/" + item.id)} className="course-item_button">Отзывы</a>
                                    </td>

                                    <td> <span onClick={() => { { fetchOneLecture(item.id); setModalUpdateActive(true) } }}><FaEdit /></span> </td>
                                    <td><span onClick={() => { { setDeleteId(item.id); setModalDeleteActive(true) } }}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>

            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <label className='course-label' htmlFor="">Выберите картинку лекции:</label>
                <input
                    {
                    ...register("picture", {
                        validate: {
                            isFile: v => v.length !== 0 || "Вы не выбрали файл!",
                            acceptedFormats: v => ['image/jpeg', 'image/png', 'image/gif'].includes(
                                v[0]?.type
                            ) || 'Выберите файл с расширением .png или jpeg'
                        }
                    })}
                    onChange={selectImg}
                    type="file" />
                {errors.picture && <p className='validate file'>{errors.picture.message}</p>}
                <label className='course-label' htmlFor="">Заголовок лекции:</label>
                <input
                    {
                    ...register("themeTitle", {
                        required: true
                    })
                    }
                    placeholder='Заголовок лекции' onChange={(e) => setLectureTitle(e.target.value)} type="text" />
                {errors?.themeTitle?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>}
                <label className='course-label' htmlFor="">Описание лекции:</label>
                <textarea
                    {
                    ...register("themeDesc", {
                        required: true
                    })
                    }
                    placeholder='Описание лекции' onChange={(e) => setLectureDesc(e.target.value)} name="" id="" cols="30" rows="5"></textarea>
                {errors?.themeDesc?.type === "required" && <p className='validate file'>Поле обязательно к заполнению!</p>}
                <label className='course-label' htmlFor="">Выбрать категорию:</label>
                <SelectComp title={'Выберите категорию'} property={'category_name'} id="category" options={categories} onChange={onCategorySelectChange} />
                <label className='course-label' htmlFor="">Выбрать файл:</label>
                <input
                    {
                    ...register("file", {
                        validate: {
                            isFile: v => v.length !== 0 || "Вы не выбрали файл!",
                            acceptedFormats: v => ['application/pdf'].includes(
                                v[0]?.type
                            ) || 'Выберите файл с расширением .pdf'
                        }
                    })}
                    onChange={selectFile} type="file" />
                    {errors.file && <p className='validate file'>{errors.file.message}</p>}
                <div className='lecture-buttons'>
                    <button onClick={handleSubmit(() => { addLecture(); setModalActive(false) })}>Создать</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>
            </Modal>
            <Modal active={modalUpdateActive} setActive={setModalUpdateActive}>
                <label className='course-label' htmlFor="">Заголовок лекции:</label>
                <input name='lecture_title' value={lecture.lecture_title} onChange={handleInputChange} type="text" />
                <label className='course-label' htmlFor="">Описание лекции:</label>
                <textarea value={lecture.lecture_desc} onChange={handleInputChange} name="lecture_desc" ></textarea>
                <label className='course-label' htmlFor="">Выберите картинку лекции:</label>
                <input onChange={selectImg} type="file" />
                <label className='course-label' htmlFor="">Выбрать файл:</label>
                <input onChange={selectFile} type="file" />
                <div className='lecture-buttons'>
                    <button onClick={() => { lectureUpdate(); setModalUpdateActive(false); }}>Обновить</button>
                    <button onClick={() => setModalUpdateActive(false)}>Отмена</button>

                </div>
            </Modal>
            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => { lectureDelete(deleteId) }} >Удалить</button><button onClick={() => setModalActive(false)}>Отмена</button></div>
            </Modal>
        </div>
    )
}

export default LectureView
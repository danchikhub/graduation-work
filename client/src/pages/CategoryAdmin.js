import React, { useEffect, useState } from "react";
import AdminAside from "../components/admin-aside/AdminAside";
import { fetchCategories } from '../http/request';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { createCategory, deleteCategory, updateCategory } from "../services/AdminService";
import Modal from "../components/modal/Modal";
const CategoryAdmin = () => {
    const [categories, setCategories] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [modalUpdateActive, setModalUpdateActive] = useState(false);
    const [category, setCategory] = useState('');
    const [selectCategory, setSelectCategory] = useState({})
    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
    }, [])
    const handleInputChange = e => {
        const { name, value } = e.target
        setSelectCategory({ ...selectCategory, [name]: value })
    }
    const addCategory = (category) => {
        createCategory(category)
        fetchCategories().then(data => setCategories(data))
    }

    const categoryUpdate = (category_id, category_name) => {
        updateCategory(category_id, category_name);
        fetchCategories().then(data => setCategories(data))
    }
    const categoryDelete = (category_id) => {
        deleteCategory(category_id)
        fetchCategories().then(data => setCategories(data))
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
                    <div>
                        <button onClick={() => {setModalActive(true)}} className='lecture-block__button'>Добавить категорию</button>
                    </div>
                </div>
                <div className="lecture-block__list">
                    <table id="region" class="region lecture-block">
                        <tr>
                            <th colspan="11"> Категории</th>
                        </tr>
                        <tr>

                            <td>№</td>
                            <td>Название</td>
                            <td colspan="2"></td>

                        </tr>
                        {
                            categories.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.category_name}</td>
                                    <td> <span onClick={() =>{setSelectCategory(item); setModalUpdateActive(true)}}><FaEdit /></span> </td>
                                    <td> <span onClick={() =>{setSelectCategory(item); setModalDeleteActive(true)}}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
               <label className='course-label' htmlFor="">Название категории:</label>
               
                <input placeholder="Название категории " onChange={(e) => setCategory(e.target.value)} type="text" />
                <div className='lecture-buttons'>
                    <button onClick={() => {addCategory(category); setModalActive(false)}}>Создать</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>
            </Modal>
            
            <Modal active={modalUpdateActive} setActive={setModalUpdateActive}>
               <label className='course-label' htmlFor="">Название категории:</label>
               <input placeholder="Название категории " name='category_name' value={selectCategory.category_name} onChange={handleInputChange} type="text" />
               <div className='lecture-buttons'>
                    <button onClick={() => {categoryUpdate(selectCategory.category_name, selectCategory.id); setModalUpdateActive(false)}}>Обновить</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>

           </Modal>



            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => {categoryDelete(selectCategory.id)}} >Удалить</button><button onClick={() => setModalActive(false) }>Отмена</button></div>
            </Modal>
        </div>
    )
}

export default CategoryAdmin
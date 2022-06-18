import React, { useState, useEffect } from "react";
import AdminAside from "../components/admin-aside/AdminAside";
import { fetchLevels } from '../http/request';
import { fetchUniversAdmin, createUniver, deleteUniver, updateUniver } from "../services/AdminService";
import { FaEdit } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../components/modal/Modal";
import SelectComp from "../components/SelectComp";
const UniversityAdmin = () => {
    const [modalActive, setModalActive] = useState(false);
    const [levels, setLevels] = useState([]);
    const [univers, setUnivers] = useState([]);
    const [levelId, setLevelId] = useState(0);
    const [univer, setUniver] = useState('')
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [modalUpdateActive, setModalUpdateActive] = useState(false);
    const [selectUniver, setSelectUniver] = useState({})

    useEffect(() => {
        fetchLevels().then(data => setLevels(data))
        fetchUniversAdmin().then(data => setUnivers(data))
    }, []);


    const handleInputChange = e => {
        const { name, value } = e.target
        setSelectUniver({ ...selectUniver, [name]: value })
    }


    const onLevelsSelectChange = (e) => {
        const level_id = e.target.options[e.target.selectedIndex].value;
        setLevelId(level_id)
    }

    const addUniver = (univer_name, level_id) => {
        createUniver(univer_name, level_id)
        fetchUniversAdmin().then(data => setUnivers(data))
    }
    const univerDelete = (univer_id) => {
        deleteUniver(univer_id)
        fetchUniversAdmin().then(data => setUnivers(data))
        setModalDeleteActive(false)

    }

    const univerUpdate = (univer_name, univer_id) => {
        updateUniver(univer_id, univer_name)
        fetchUniversAdmin().then(data => setUnivers(data))
    } 
    
    return (
        <div className="lectureView-wrapper">
            <div className="aside-inner">
                <AdminAside />
            </div>
            <div className="lecture-block">
                <div className='lecture-block__create'>
                    <h2>Учебные заведения</h2>
                    <div>
                        <button onClick={() => { setModalActive(true) }} className='lecture-block__button'>Добавить заведение</button>
                    </div>
                </div>
                <div className="lecture-block__list">
                    <table id="region" class="region lecture-block">
                        <tr>
                            <th colspan="11">Учебные заведения</th>
                        </tr>
                        <tr>

                            <td>№</td>
                            <td>Название</td>
                            <td>Уровень</td>
                            <td colspan="2"></td>

                        </tr>
                        {
                            univers.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.univer_name}</td>
                                    <td>{item.level_name}</td>
                                    <td> <span onClick={() => {setSelectUniver(item); setModalUpdateActive(true)}}><FaEdit /></span> </td>
                                    <td> <span onClick={() => {setSelectUniver(item); setModalDeleteActive(true)}}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <label className='course-label' htmlFor="">Название учебного заведения:</label>
                <input placeholder="Название учебного заведения" onChange={ (e) => setUniver(e.target.value)} className="input-help" type="text" />
                <label className='course-label' htmlFor="">Выбрать уровень образования:</label>
                <SelectComp styleClass={'filter-select'} title={'Выберите уровень'} property={'level_name'} id="level" options={levels} onChange={onLevelsSelectChange} />
                <div className='lecture-buttons'>
                    <button onClick={() => {addUniver(univer, levelId); setModalActive(false)}}>Создать</button>
                    <button >Отмена</button>
                </div>
            </Modal>
            
            <Modal active={modalUpdateActive} setActive={setModalUpdateActive}>
                <label className='course-label' htmlFor="">Название учебного заведения:</label>
               <input name='univer_name' value={selectUniver.univer_name} onChange={handleInputChange} type="text" />
               <div className='lecture-buttons'>
                    <button onClick={() => {univerUpdate(selectUniver.univer_name, selectUniver.id); setModalUpdateActive(false)}}>Обновить</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>

           </Modal>


            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => {univerDelete(selectUniver.id)}} >Удалить</button><button onClick={() => setModalActive(false) }>Отмена</button></div>
            </Modal>
        </div>
    )
}

export default UniversityAdmin
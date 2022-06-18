
import React, { useEffect, useState } from "react";
import AdminAside from "../components/admin-aside/AdminAside";
import { fetchLevels } from '../http/request';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { createLevel, deleteLevel, updateLevel } from "../services/AdminService";
import Modal from "../components/modal/Modal";
const LevelAdmin = () => {
    const [levels, setLevels] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [modalUpdateActive, setModalUpdateActive] = useState(false);
    const [level, setLevel] = useState('');
    const [selectLevel, setSelectLevel] = useState({})
    useEffect(() => {
        fetchLevels().then(data => setLevels(data))
    }, [])
    const handleInputChange = e => {
        const { name, value } = e.target
        setSelectLevel({ ...selectLevel, [name]: value })
    }
    const addLevel = (level) => {
        createLevel(level)
        fetchLevels().then(data => setLevels(data))
    }

    const levelUpdate = (level_id, level_name) => {
        updateLevel(level_id, level_name);
        fetchLevels().then(data => setLevels(data))
    }
    const levelDelete = (level_id) => {
        deleteLevel(level_id)
        fetchLevels().then(data => setLevels(data))
        setModalDeleteActive(false)
    }
    return (
        <div className="lectureView-wrapper">
            <div className="aside-inner">
                <AdminAside />
            </div>
            <div className="lecture-block">
                <div className='lecture-block__create'>
                    <h2>Уровень</h2>
                    <div>
                        <button onClick={() => {setModalActive(true)}} className='lecture-block__button'>Добавить уровень</button>
                    </div>
                </div>
                <div className="lecture-block__list">
                    <table id="region" class="region lecture-block">
                        <tr>
                            <th colspan="11">Уровень</th>
                        </tr>
                        <tr>

                            <td>№</td>
                            <td>Название</td>
                            <td colspan="2"></td>

                        </tr>
                        {
                            levels.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.level_name}</td>
                                    <td> <span onClick={() =>{setSelectLevel(item); setModalUpdateActive(true)}}><FaEdit /></span> </td>
                                    <td> <span onClick={() =>{setSelectLevel(item); setModalDeleteActive(true)}}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <label className='course-label' htmlFor="">Название уровня образования:</label>
                <input placeholder="Название уровня образования" onChange={(e) => setLevel(e.target.value)} type="text" />
                <div className='lecture-buttons'>
                    <button onClick={() => {addLevel(level); setModalActive(false)}}>Создать</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>
            </Modal>
            
            <Modal active={modalUpdateActive} setActive={setModalUpdateActive}>
                <label className='course-label' htmlFor="">Название уровня образования:</label>
               <input name='level_name' placeholder="Название уровня образования" value={selectLevel.level_name} onChange={handleInputChange} type="text" />
               <div className='lecture-buttons'>
                    <button onClick={() => {levelUpdate(selectLevel.level_name, selectLevel.id); setModalUpdateActive(false)}}>Обновить</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>

           </Modal>



            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => {levelDelete(selectLevel.id)}} >Удалить</button><button onClick={() => setModalActive(false) }>Отмена</button></div>
            </Modal>
        </div>
    )
}


export default LevelAdmin
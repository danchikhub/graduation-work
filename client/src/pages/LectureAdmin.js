import React, { useEffect, useState } from "react";
import AdminAside from "../components/admin-aside/AdminAside";
import { fetchLectures } from '../http/request';
import { MdDeleteOutline } from "react-icons/md";
import { deleteLecture } from "../services/LectureService";
import Modal from "../components/modal/Modal";

const LectureAdmin = () => {
    const [lectures, setLectures] = useState([]);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [selectLecture, setSelectLecture] = useState({})
    useEffect(() => {
        fetchLectures(0, 0).then(data => setLectures(data))
    }, [lectures])
    
    

   
    const lectureDelete = (lecture_id) => {
        deleteLecture(lecture_id)
        fetchLectures(0, 0).then(data => setLectures(data))
        setModalDeleteActive(false)
    }
    
    return (
        <div className="lectureView-wrapper">
            <div className="aside-inner">
                <AdminAside />
            </div>
            <div className="lecture-block">
                <div className='lecture-block__create'>
                    <h2>Лекции</h2>
                    
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
                            <td colspan="1"></td>

                        </tr>
                        {
                            lectures.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.lecture_title}</td>
                                    <td>{item.univer_name}</td>
                                    <td> <span onClick={() =>{setSelectLecture(item); setModalDeleteActive(true)}}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>
            </div>
           
            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => {lectureDelete(selectLecture.id)}} >Удалить</button><button onClick={() => setModalDeleteActive(false) }>Отмена</button></div>
            </Modal>
        </div>
    )
}

export default LectureAdmin


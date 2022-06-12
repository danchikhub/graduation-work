import React, { useEffect, useState } from "react";
import AdminAside from "../components/admin-aside/AdminAside";
import { fetchUsers, deleteUser } from '../http/request';
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../components/modal/Modal";

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [selectUser, setSelectUser] = useState({})

    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
    }, [])
    
    

   
    const userDelete = (user_id) => {
        deleteUser(user_id)
        fetchUsers().then(data => setUsers(data))
        setModalDeleteActive(false)
    }
    
    return (
        <div className="lectureView-wrapper">
            <div className="aside-inner">
                <AdminAside />
            </div>
            <div className="lecture-block">
                <div className='lecture-block__create'>
                    <h2>Пользователи</h2>
                    
                </div>
                <div className="lecture-block__list">
                    <table id="region" class="region lecture-block">
                        <tr>
                            <th colspan="11">Пользователи</th>
                        </tr>
                        <tr>

                            <td>№</td>
                            <td>Имя</td>
                            <td>Email</td>
                            <td colspan="1"></td>

                        </tr>
                        {
                            users.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.email}</td>
                                    <td> <span onClick={() =>{setSelectUser(item); setModalDeleteActive(true)}}><MdDeleteOutline /></span></td>
                                </tr>
                            })
                        }


                    </table>
                </div>
            </div>
           
            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <h2 className="delete-title">Вы уверены?</h2>
                <div className="theme-buttons delete"><button onClick={() => {userDelete(selectUser.id)}} >Удалить</button><button onClick={() => setModalDeleteActive(false) }>Отмена</button></div>
            </Modal>
        </div>
    )
}

export default UserAdmin
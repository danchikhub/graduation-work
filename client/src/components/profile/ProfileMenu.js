import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../index';
import './profileMenu.css';
const ProfileMenu = ({active, setActive}) => {
    const {userStore} = useContext(Context);
    console.log(userStore.isInstructor)
    return (
        <div className={active ? "profile-menu active" : "profile-menu"}>
            <ul className="profile-menu_list">
                <li className="profile-list_item">
                    {   
                        userStore.isAdmin === true ?
                            <Link className="profile-list_link" to={'/category-admin'}>Админ панель</Link>
                        :
                        userStore.isInstructor === true ? 
                        <Link className="profile-list_link" to={'/cabinet'}>Кабинет</Link>
                        :
                        <Link className="profile-list_link" to={'/instructor-registration'}>Зарегистрироваться как преподаватель</Link>
                    }
                    
                </li>
                <li className="profile-list_item">
                    <Link onClick={() => {userStore.logout()}} className="profile-list_link" to={'/'}>Выйти</Link>
                </li>
            </ul>
        </div>
    )
}

export default ProfileMenu;
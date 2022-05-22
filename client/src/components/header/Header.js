import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo.png';
import profileMenuIcon from '../../resources/icons/profile-menu_icon.svg';
import { Context } from '../../index';
import { observer } from "mobx-react-lite";
import ProfileMenu from '../profile/ProfileMenu';
const Header = () => {
    const { userStore } = useContext(Context);
    const [modalActive, setModalActive] = useState(false);
    console.log(userStore)
    return (
        <div className='header'>
            <div className='container'>
                <div className='nav-wrapper'>
                    <div className='wrapper'>
                        <div className='logo-wrapper'>
                            <Link to='/'>
                                <img src={logo} />
                            </Link>
                        </div>
                        <nav className='nav'>
                            <ul className='nav-list'>
                                <li className='nav-list_item'>
                                    <Link to='/courses' className='nav-list_link'>Курсы</Link>
                                </li>
                                <li className='nav-list_item'>
                                    <Link to='/about' className='nav-list_link'>О проекте</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>


                    {
                        userStore.isAuth ?
                            <div onClick={() => { modalActive ? setModalActive(false) : setModalActive(true)} } className="profile_wrapper">
                                <h2 className='user_last-name'>{userStore.user.first_name}</h2>
                                <svg class="profile-menu_arrow">
                                    <use xlinkHref={`${profileMenuIcon}#profile-arrow`}></use>
                                </svg>
                                <ProfileMenu active={modalActive} setActive={setModalActive}/>
                            </div>
                            

                            :

                            <div className='auth'>
                                <Link to='/login' className='auth-button'>Вход</Link>
                                <Link to='/registration' className='auth-button'>Регистрация</Link>
                            </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default observer(Header);
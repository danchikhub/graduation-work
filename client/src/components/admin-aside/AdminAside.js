import React from "react";
import { Link } from 'react-router-dom';

const AdminAside = () => {
    return (
        <div className="aside-wrapper">
            <ul className="aside-list">
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet'>Категории</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/course'>Учебные заведения</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/lecture'>Уровень образования</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/lecture'>Курсы</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/lecture'>Лекции</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/lecture'>Пользователи</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminAside;

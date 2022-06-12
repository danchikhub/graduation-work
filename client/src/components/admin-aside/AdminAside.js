import React from "react";
import { Link } from 'react-router-dom';

const AdminAside = () => {
    return (
        <div className="aside-wrapper">
            <ul className="aside-list">
                <li className="aside-item">
                   <Link className='aside-link' to='/category-admin'>Категории</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/unversity-admin'>Учебные заведения</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/level-admin'>Уровень образования</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/course-admin'>Курсы</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/lecture-admin'>Лекции</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/user-admin'>Пользователи</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminAside;

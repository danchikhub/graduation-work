import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './aside.css';


const Aside = () => {
    return (
        <div className="aside-wrapper">
            <ul className="aside-list">
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet'>Панель</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/course'>Курсы</Link>
                </li>
                <li className="aside-item">
                   <Link className='aside-link' to='/cabinet/lecture'>Лекции</Link>
                </li>
            </ul>
        </div>
    )
}

export default Aside;
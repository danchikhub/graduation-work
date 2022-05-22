import React, { useState, useEffect, useContext } from "react";
import logo from '../../assets/logo.png';
import './course-item.css';
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CourseItem = ({item}) => {
    const history = useNavigate()
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
        
    };
    const stars = Array(5).fill(0)
    return(
        <div className="course-item">
            <img className="course-item_img" src={process.env.REACT_APP_API_URL + item.course_img} alt="" />
            <span className="course-item_univer">{item.univer_name}</span>
            <div className="course-item_title">{item.course_title}</div>
            <button onClick={() => history("/course" + "/" + item.id)} className="course-item_button">Подробнее</button>
            
            <span>
                {stars.map((_, index) => {
                    return (
                        <FaStar key={index}
                                color={(Math.floor(item.average_rating) > index ) ? colors.orange : colors.grey}
                        />
                    )
                    
                })}
            </span>
        </div>
    )
    
}
export default CourseItem;
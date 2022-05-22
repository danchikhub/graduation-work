import React, { useState, useEffect, useContext } from "react";
import CourseItem from "../course-item/CourseItem";
import {observer} from "mobx-react-lite";
import { fetchCourses } from "../../http/request";
import { Context } from "../../index";
import './course-list.css'
const CourseList = observer(() => {
    const [courses, setCourses] = useState([])
    const {courseStore} = useContext(Context)
    
    useEffect(() => {
        fetchCourses(courseStore.selectCategory, courseStore.selectUniver).then(data => courseStore.setCourses(data))   
    }, [])
    
    return(
    <div className="container">
        <div className="course-list_wrapper">
            {
                courseStore.courses.map(item => 
                    
                    <CourseItem key={item.id} item={item}/>
                )
            }
        </div>
    </div>
    
    )
})

export default CourseList;
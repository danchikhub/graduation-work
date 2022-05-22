import React, { useState, useEffect, useContext } from "react";
import CourseList from "../components/course-list/CourseList";
import FiltrPanel from "../components/filtr-panel/FiltrPanel";
const CourseView = () => {
    return(
        <div>
            <FiltrPanel/>
            <CourseList/>
        </div>
        
    )
}

export default CourseView;
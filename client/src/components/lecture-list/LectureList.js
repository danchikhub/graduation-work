import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { fetchLectures } from "../../http/request";
import LectureItem from "../lecture-item/LectureItem";
import {observer} from "mobx-react-lite";

const LectureList = observer(() => {
    const {lectureStore} = useContext(Context);
    useEffect(() => {
        fetchLectures(lectureStore.selectCategory, lectureStore.selectUniver).then(data => lectureStore.setLectures(data))
    }, [])
    console.log(lectureStore.lectures)
    return(
        <div className="container">
            <div className="course-list_wrapper">
               {
                    lectureStore.lectures.map(item =>
                        <LectureItem key={item.id} item={item}/>
                    )
               }
            </div>
        </div>
        
    )
})

export default LectureList
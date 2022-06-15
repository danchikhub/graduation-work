import React, { useState, useEffect } from "react";
import { fetchCourseRewiew } from "../http/request";
import { useParams } from "react-router-dom";
const CourseRewiew = () => {
    const [rewiews, setRewiews] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetchCourseRewiew(id).then(data => setRewiews(data))
    }, [])
    console.log(rewiews)
    return (
        <div>
            <div className="container">
                <h2 className="rewiew-title">Отзывы</h2>

                {
                    rewiews.map((item) => {
                        return <div className="rewiew" key={item.id}>
                            <div className="rewiew-name">{item.first_name} :</div>
                            <div className="rewiew-comment">{item.comment}</div>
                        </div>
                    })
                }
            </div>
            

        </div>
    )
}

export default CourseRewiew
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { fetchLectureForPage } from "../http/request";
import { setRewiew } from "../services/LectureService";
import {Context} from "../index";
import Modal from "../components/modal/Modal";
const LecturePage = () => {
    const {userStore} = useContext(Context);
    const [modalActive, setModalActive] = useState(false);
    const { id } = useParams();
    const [lecture, setLecture] = useState({})
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [comment, setComment] = useState('')
    const stars = Array(5).fill(0)
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };
    useEffect(() => {
        fetchLectureForPage(id).then(data => setLecture(data[0]))
    })
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    console.log(lecture)
    return (
        <div className="container">
            <div className="course-page__wrapper">
                <div className="course-page">
                    <div className="course-page__material">
                        <div className="course-page__title-wrapper">
                            <div className="course-page__title">
                                {lecture.lecture_title}
                            </div>
                            <div >
                                <button onClick={() => setModalActive(true)} className="course-page__button" >Отзыв</button>
                            </div>
                        </div>
                        <div className="lecture-help">
                            <div className="course-page__desc-title">О лекции</div>
                            <p className="course-page__desc">
                                {lecture.lecture_desc}
                            </p>

                        </div>
                        <a className="theme-page__link lecture" href={process.env.REACT_APP_API_URL + lecture.lecture_file} target="_blank" download>Скачать файл</a>
                    </div>
                    <div className="course-page__info">
                        <div>
                            <img width="200" src={process.env.REACT_APP_API_URL + lecture.lecture_img} alt="" />
                        </div>
                        <div>
                            {
                                stars.map((_, index) => {
                                    return (
                                        <FaStar key={index} size={18}
                                            color={(Math.floor(lecture.average_rating) > index) ? colors.orange : colors.grey}
                                        />
                                    )

                                })
                            }
                        </div>
                        <p>Дата создания: 2020-10-20</p>
                        {<p>Создатель: {lecture.first_name + " " + lecture.last_name}</p>}
                    </div>
                </div>

            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <h3 className="course-rating__title">Оставить отзыв</h3>
                <div>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            />
                        )
                    })}
                </div>
                <textarea onChange={(e) => setComment(e.target.value)} className="course-comment" name="" id="" cols="30" rows="10"></textarea>
                <button onClick={() => { setRewiew(userStore.user.id, id, currentValue, comment); setModalActive(false)  }} className="theme-rating__button">Отправить</button>
            </Modal>
        </div>
    )
}

export default LecturePage
import React, { useEffect, useState, useContext } from "react";
import '../resources/styles/course-page.css';
import { FaStar } from "react-icons/fa";
import { fetchCourse } from "../http/request";
import { fetchThemes } from "../http/request";
import { useParams } from "react-router-dom";
import Modal from "../components/modal/Modal";
import {Context} from "../index";
import { setRewiew } from "../services/CourseService";

const CoursePage = () => {
    const { id } = useParams();
    const {userStore} = useContext(Context);
    const [course, setCourse] = useState({})
    const [themes, setThemes] = useState([])
    const [modalActive, setModalActive] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [comment, setComment] = useState('')
    useEffect(() => {
        fetchCourse(id).then(data => setCourse(data[0]))
        fetchThemes(id).then(data => setThemes(data))
    }, [])
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };
    const handleClick = value => {
        setCurrentValue(value)
      }
    
      const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
      };
    
      const handleMouseLeave = () => {
        setHoverValue(undefined)
      }
    
    const stars = Array(5).fill(0)
    return (
        <div className="container">
            <div className="course-page__wrapper">
                <div className="course-page">
                    <div className="course-page__material">
                        <div className="course-page__title-wrapper">
                            <div className="course-page__title">
                                {course.course_title}
                            </div>
                            <div >
                                <button className="course-page__button" onClick={() => setModalActive(true)}>Отзыв</button>
                            </div>
                        </div>
                        <div >
                            <div className="course-page__desc-title">О курсе</div>
                            <p className="course-page__desc">
                                {course.course_desc}
                            </p>
                        </div>
                        <div className="course-page__themes">
                            {
                                themes.map((item) => {
                                    return <div className="course-page__theme">

                                        <div className="theme-page__title">Тема: <span>{item.theme_title}</span> </div>
                                        <div >
                                            <div >Описание:</div>
                                            <div className="theme-page__desc">{item.theme_desc}</div>
                                        </div>
                                        <a className="theme-page__link" href={process.env.REACT_APP_API_URL + item.theme_file} target="_blank" download>Скачать файл</a>
                                    </div>
                                })
                            }

                        </div>
                    </div>
                    <div className="course-page__info">
                        <div>
                            <img width="200" src={process.env.REACT_APP_API_URL + course.course_img} alt="" />
                        </div>
                        <div>
                            {
                                stars.map((_, index) => {
                                    return (
                                        <FaStar key={index} size={18}
                                            color={(Math.floor(course.average_rating) > index) ? colors.orange : colors.grey}
                                        />
                                    )

                                })
                            }
                        </div>
                        <p>Дата создания: 2020-10-20</p>
                        <p>Создатель: {course.first_name + " " + course.last_name}</p>
                    </div>
                </div>

            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                {
                    userStore.isAuth ? 
                <div>
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
                    <textarea onChange={(e) => setComment(e.target.value)} className="course-comment" cols="30" rows="10"></textarea>
                    <button onClick={() => { setRewiew(userStore.user.id, id, currentValue, comment); setModalActive(false)  }} className="theme-rating__button">Отправить</button>
                </div>
            :
            <div>
                <h3 className="course-rating__title">Не авторизованным пользователям нельзя оставить отзыв!</h3>
            </div>
            }
            </Modal>
        </div>

    )
}
export default CoursePage
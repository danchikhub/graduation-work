import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import slideOne from '../assets/slide1.svg';
import slideTwo from '../assets/slide2.svg';
import slideThree from '../assets/slide3.svg';
import { fetchUniversRating } from "../http/request";
import { Link } from 'react-router-dom';
import how from '../assets/how.jpg';
import '../resources/styles/main.css'
const Main = () => {
  const [ratings, setRatings] = useState([])


  useEffect(() => {
    fetchUniversRating().then(data => {
      let result = data.filter(item => item.univer_name != null)
      let finish = result.sort((a, b) => {
        if (+a.average_rating < +b.average_rating) {
          return 1;
        }
        if (+a.average_rating > +b.average_rating) {
          return -1;
        }
        return 0
      })
      setRatings(finish)
    })

  }, [])

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
    arrows: true,
    dotsClass: "dots-main",
    appendDots: dots => {
      return (
        <div>
          <ul>
            {dots.map((item, index) => {
              return (
                <li key={index}>{item.props.children}</li>
              );
            })}
          </ul>
        </div>
      )
    },
  };
  return (
    <div className="main-wrapper">
      <div className="welcome-wrapper">
        <div className="container welcome">
          <h2 className="welcome-title">
            Добро пожаловать в Открытый Образовательный Ресурс!
          </h2>
          <div className="welcome-inner">
            <div className="welcome-items">
              <div className="welcome-item">
                <div className="welcome-item__title">Курсы</div>
                <div className="welcome-item__desc">Курсы от ведущих учебных заведений Кыргызской Республики</div>
                <Link className="welcome-item__link" to='/courses'>Перейти</Link>
              </div>
              <div className="welcome-item">
                <div className="welcome-item__title">Лекции</div>
                <div className="welcome-item__desc">Лекции от ведущих учебных заведений Кыргызской Республики</div>
                <Link className="welcome-item__link" to='/lectures'>Перейти</Link>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="container slid">

        <Slider {...settings}>
          <div >
            <div className="main-slider__item">
              <div className="main-slider__img">
                <img src={slideOne} alt="" />
              </div>
              <div className="main-slider__info">
                <h2 className="main-slider__info-title">Что такое Open Education?</h2>
                <p>Open Education - это открытый образовательный ресурс для всех Высших и Средних учебных заведений
                  Кыргызской Республики. У всего преподавательского состава есть возможность загружать свои обучающие
                  материалы на данном портале и заполнять контентом. Таким образом каждый студент из любого ВУЗа или СПУЗа
                  имеет доступ ко всем обучающим материалам. Для студентов также будет возможность просмотривать все загруженные на
                  портал материалы.
                </p>
              </div>
            </div>

          </div>
          <div >
            <div className="main-slider__item">
              <div className="main-slider__img">
                <img src={slideTwo} alt="" />
              </div>
              <div className="main-slider__info">
                <h2 className="main-slider__info-title">Повышения качества образования всей страны</h2>
                <p>Вы можете делиться своими полезными обучающими материалами для повышения качества образования студентов всей страны.
                </p>
              </div>
            </div>

          </div>
          <div >
            <div className="main-slider__item">
              <div className="main-slider__img">
                <img src={slideThree} alt="" />
              </div>
              <div className="main-slider__info">
                <h2 className="main-slider__info-title">Как быстро разобраться в работе сайта?</h2>
                <p>Вы можете делиться своими полезными обучающими материалами для повышения качества образования студентов всей страны.
                </p>
              </div>
            </div>

          </div>
        </Slider>

      </div>
      <div className="container rating">
        <div className="ratings-wrapper">
          <h2 className="rating-title">Top учебных заведений</h2>
          <div className="rating-list">
            {
              ratings.map((item, index) => {
                return <div key={index} className="rating-name">
                  {item.univer_name}
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="container how">
        <h2 className="how-title">Как это работает?</h2>
        <div className="how-items">
          <div className="how-item how-item__img">
            <img src={how} alt="" />
          </div>
          <div className="how-item">
            <div className="how-inner">
              <div className="number number-1">1</div>
              <div className="how-item__desc">
                Любой преподаватель университета по желанию может создавать курсы, наполняя их содержимым в виде текстов, вспомогательных файлов, презентаций, тестов и т.п
              </div>
            </div>
            <div className="how-inner">
              <div className="number number-2">2</div>
              <div className="how-item__desc">
                Все студенты могут получить все обучающие материалы абсолютно бесплатно
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default Main;
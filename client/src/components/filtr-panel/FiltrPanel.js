import React, { useState, useEffect, useContext } from "react";
import SelectComp from "../SelectComp";
import { fetchCategories } from "../../http/request";
import { fetchUnivers } from "../../http/request";
import { fetchCourses, fetchCoursesSearch } from "../../http/request";
import { Context } from "../../index";
import './filtrPanel.css';
const FiltrPanel = () => {
    const [categories, setCategories] = useState([]);
    const [univers, setUnivers] = useState([]);
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState('');
    const [courseCount, setCourseCount] = useState(0)
    const {courseStore} = useContext(Context)
    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
        fetchUnivers().then(data => setUnivers(data))
        fetchUnivers().then(data => setUnivers(data))
        setCourseCount(courseStore.courses.length)
    }, [])
    const filtCourse = (categoryId, univerId) => {
        fetchCourses(categoryId, univerId).then(data => courseStore.setCourses(data))
    }
    const onCategorySelectChange = e => {
        const category_id = e.target.options[e.target.selectedIndex].value;
        courseStore.setSelectCategory(category_id)
        filtCourse(courseStore.selectCategory, courseStore.selectUniver)
    }
    const onUniverSelectChange = e => {
        const univer_id = e.target.options[e.target.selectedIndex].value;
        courseStore.setSelectUniver(univer_id)
        filtCourse(courseStore.selectCategory, courseStore.selectUniver)
    }
    console.log(courseStore.courses.length)
    return (
        <div className="filter-wrapper">
            <div className="container">
            <div className="filter-title">
                Всего курсов: {courseCount}
            </div>
            <div className="filter-inner">
                <SelectComp styleClass={'filter-select'} title={'Выберите категорию'} property={'category_name'} id="category" options={categories} onChange={onCategorySelectChange} />
                <SelectComp styleClass={'filter-select'} title={'Выберите учебное заведение'} property={'univer_name'} id="category" options={univers} onChange={onUniverSelectChange} />
                <div className="filter-search">
                    <input onChange={e => setSearch(e.target.value)} placeholder="Поиск" type="text" />
                    <button onClick={() => fetchCoursesSearch(search).then(data => courseStore.setCourses(data))}>Найти</button>
                </div>
            </div>
            </div>
            
        </div>

    )
}

export default FiltrPanel;
import React, {useEffect, useState, useContext} from "react";
import SelectComp from "../SelectComp";
import { fetchCategories, fetchLevels , fetchUniversForFilter } from "../../http/request";
import { fetchUnivers, fetchLectures } from "../../http/request";
import { Context } from "../../index";
import { fetchLecturesSearch } from "../../http/request";

const FiltrLecture = () => {
    const {lectureStore} = useContext(Context)
    const [categories, setCategories] = useState([]);
    const [levels, setLevels] = useState([])
    const [univers, setUnivers] = useState([]);
    const [search, setSearch] = useState('');
    const [lectureCount, setLectureCount] = useState(0)
    useEffect(() => {
        fetchLevels().then(data => setLevels(data))
        fetchCategories().then(data => setCategories(data))
        fetchUnivers().then(data => setUnivers(data))
        setLectureCount(lectureStore.lectures.length)
    }, [])
    const filtLecture = (categoryId, univerId) => {
        fetchLectures(categoryId, univerId).then(data => lectureStore.setLectures(data))
    }
    const onCategorySelectChange = e => {
        const category_id = e.target.options[e.target.selectedIndex].value;
        lectureStore.setSelectCategory(category_id)
        filtLecture(lectureStore.selectCategory, lectureStore.selectUniver)
    }
    const onUniverSelectChange = e => {
        const univer_id = e.target.options[e.target.selectedIndex].value;
        lectureStore.setSelectUniver(univer_id)
        filtLecture(lectureStore.selectCategory, lectureStore.selectUniver)
    }
    const onLevelsSelectChange = e => {
        const levelId = parseInt(e.target.options[e.target.selectedIndex].value);
        if(levelId === 0) {
            fetchUnivers().then(data => setUnivers(data))
        }
        else{
            fetchUniversForFilter(levelId).then(data => setUnivers(data))
        }
        
    }
    return (
        <div className="filter-wrapper">
            <div className="container">
            <div className="filter-title">
                Всего лекций: {lectureCount}
            </div>
            <div className="filter-inner">
                <SelectComp styleClass={'filter-select'} title={'Выберите категорию'} property={'category_name'} id="category" options={categories} onChange={onCategorySelectChange} />
                <SelectComp styleClass={'filter-select'} title={'Выберите уровень образования'} property={'level_name'} options={levels} onChange={onLevelsSelectChange}  />
                <SelectComp styleClass={'filter-select'} title={'Выберите учебное заведение'} property={'univer_name'} id="category" options={univers} onChange={onUniverSelectChange} />
                <div className="filter-search">
                    <input onChange={e => setSearch(e.target.value)}  placeholder="Поиск" type="text" />
                    <button onClick={() => fetchLecturesSearch(search).then(data => lectureStore.setLectures(data))}>Найти</button>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default FiltrLecture
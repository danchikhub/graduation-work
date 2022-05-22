import {makeAutoObservable} from "mobx";
export default class CourseStore {
    courses = [];
    selectCategory = 0;
    selectUniver = 0;
    constructor() {
        makeAutoObservable(this)
    }

    setCourses(courses) {
        this.courses = courses
    }
    setSelectCategory(select) {
        this.selectCategory = select
    }
    setSelectUniver(select) {
        this.selectUniver = select
    }
}
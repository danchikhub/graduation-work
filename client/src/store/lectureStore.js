import {makeAutoObservable} from "mobx";
export default class LectureStore {
    lectures = []
    selectCategory = 0;
    selectUniver = 0;
    constructor() {
        makeAutoObservable(this)
    }
    setLectures(lectures) {
        this.lectures = lectures
    }
    setSelectCategory(select) {
        this.selectCategory = select
    }
    setSelectUniver(select) {
        this.selectUniver = select
    }
}
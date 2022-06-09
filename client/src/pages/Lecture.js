import React from 'react';
import FiltrLecture from '../components/filtr-lecture/FiltrLecture';
import LectureList from '../components/lecture-list/LectureList';
const Lecture = () => {
    return(
        <div>
            <FiltrLecture/>
            <LectureList/>
        </div>
        
    )
}
export default Lecture
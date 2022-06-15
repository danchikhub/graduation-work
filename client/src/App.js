import React, {useContext, useEffect} from 'react';
import Header from './components/header/Header';
import {Routes, Route} from 'react-router-dom';
import { Context } from './index';
import About from './pages/About';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import IstructorRegistration from './pages/InstructorRegistration';
import Cabinet from './pages/Cabinet';
import Course from './pages/Course';
import CourseView from './pages/CourseView';
import Edit from './pages/Edit';
import CoursePage from './pages/CoursePage';
import Main from './pages/Main'
import LectureView from './pages/LectureView';
import Lecture from './pages/Lecture';
import LecturePage from './pages/LecturePage';

import CategoryAdmin from './pages/CategoryAdmin';
import UniversityAdmin from './pages/UniversityAdmin';
import LevelAdmin from './pages/LevelAdmin';
import CourseAdmin from './pages/CourseAdmin';
import LectureAdmin from './pages/LectureAdmin';
import UserAdmin from './pages/UserAdmin';
import CourseRewiew from './pages/CourseRewiew';
import LectureRewiew from './pages/LectureRewiew';
function App() {
  const {userStore} = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
        userStore.checkAuth()
    }
  }, [])
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/instructor-registration' element={<IstructorRegistration/>} />
        <Route path='/cabinet' element={<Cabinet/>}/>
        <Route path="/cabinet/course" element={<Course/>}/>
        <Route path="/cabinet/lecture" element={<LectureView/>}/>
        <Route path="/courses" element={<CourseView/>}/>
        <Route path="/lectures" element={<Lecture/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/course/:id' element={<CoursePage/>}/>
        <Route path='/course-rewiew/:id' element={<CourseRewiew/>}/>
        <Route path='/lecture-rewiew/:id' element={<LectureRewiew/>}/>
        <Route path='/lecture/:id' element={<LecturePage/>}/>
        <Route path='/' element={<Main/>}/>

        <Route path='/category-admin' element={<CategoryAdmin/>} />
        <Route path='/unversity-admin' element={<UniversityAdmin/>} />
        <Route path='/level-admin' element={<LevelAdmin/>} />
        <Route path='/course-admin' element={<CourseAdmin/>} />
        <Route path='/lecture-admin' element={<LectureAdmin/>} />
        <Route path='/user-admin' element={<UserAdmin/>} />

      </Routes>
    </div>
      
  );
}

export default App;

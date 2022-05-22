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

function App() {
  const {userStore} = useContext(Context);
  console.log(userStore)
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
        <Route path="/courses" element={<CourseView/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/course/:id' element={<CoursePage/>}/>
        <Route path='/' element={<Main/>}/>
      </Routes>
    </div>
      
  );
}

export default App;

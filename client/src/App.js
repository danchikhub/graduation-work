import React, {useContext, useEffect} from 'react';
import Header from './components/header/Header';
import {Routes, Route} from 'react-router-dom';
import { Context } from './index';
import About from './pages/About';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import IstructorRegistration from './pages/InstructorRegistration';

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
      </Routes>
    </div>
      
  );
}

export default App;

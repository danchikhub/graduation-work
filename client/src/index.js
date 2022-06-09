import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/userStore';
import {BrowserRouter} from "react-router-dom";
import CourseStore from './store/courseStore';
import LectureStore from './store/lectureStore'
export const userStore = new UserStore();
export const courseStore = new CourseStore();
export const lectureStore = new LectureStore();
export const Context = createContext({userStore, courseStore, lectureStore})
ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{userStore, courseStore, lectureStore}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);



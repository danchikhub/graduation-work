import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/userStore';
import {BrowserRouter} from "react-router-dom";
export const userStore = new UserStore();
export const Context = createContext({userStore})
ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{userStore}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);



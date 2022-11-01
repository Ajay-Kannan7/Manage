import { BrowserRouter,Routes,Route,NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import RegisterPage from "./components/register/register";
import LoginPage from "./components/login/login";
import AddTask from "./components/add-task/addTask";
import HomePage from "./components/home/homepage";
import "./App.css"
function App() {

  //redux state management
  let state=useSelector(state=>{return{...state}})
  let dispatch=useDispatch();
  let isLoggedIn=localStorage.getItem("isLogged");
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn?<HomePage />:<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/add-task" element={<AddTask />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

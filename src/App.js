import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import RegisterPage from "./components/register/register";
import LoginPage from "./components/login/login";
import AddTask from "./components/add-task/addTask";
import HomePage from "./components/home/homepage";
import TaskDone from "./components/tasks-done/task-done";
import axios from "axios";
import "./App.css"
import { useEffect } from "react";
function App() {
  let isLoggedIn=localStorage.getItem("isLogged");
  let userName=localStorage.getItem("user")
      //redux state management
  let state=useSelector(state=>{return{...state}})
  let dispatch=useDispatch();
    
  useEffect(()=>{
      axios.post("https://manage-backend.onrender.com/",{userName})
      .then(res=>{
        dispatch({
          type:"LOADDATA",
          payload:res.data.allData
        })
      })
      .catch(err=>console.log(err))

      axios.post("https://manage-backend.onrender.com/task-done",{userName})
      .then(res=>{
          dispatch({
              type:"DONETASK",
              payload:res.data.done
          })
      })
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn?<HomePage data={state.allData}/>:<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/add-task" element={<AddTask />}></Route>
        <Route path="/tasks-done" element={<TaskDone data={state.doneData}/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

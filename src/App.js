import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import RegisterPage from "./components/register/register";
import LoginPage from "./components/login/login";
import AddTask from "./components/add-task/addTask";
import HomePage from "./components/home/homepage";
import axios from "axios";
import "./App.css"
function App() {
  let isLoggedIn=localStorage.getItem("isLogged");
  let userName=localStorage.getItem("user")
      //redux state management
  let state=useSelector(state=>{return{...state}})
  let dispatch=useDispatch();
    
  axios.post("https://manage-backend-production.up.railway.app/",{userName})
  .then(res=>{
    dispatch({
      type:"LOADDATA",
      payload:res.data.allData
    })
  })
  .catch(err=>console.log(err))

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn?<HomePage data={state.allData}/>:<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/add-task" element={<AddTask />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

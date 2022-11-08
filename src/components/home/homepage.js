import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "./homepage.css"
import axios from "axios";
function HomePage(props){

  //navbar code
  let [iconValue,handleIcon]=useState({
    initialValue:faBars
  })

  let data;
  if(props.data===null){
    return
  }
  else{
    data=props.data
  }
  let userName=localStorage.getItem("user")
  

  let handleClick=()=>{
    let navBox=document.querySelector(".navigation nav")
    navBox.classList.toggle("visible")
    handleIcon(()=>{
      if(iconValue.initialValue===faBars){
        return{
          initialValue:faXmark
        }
      }else{
        return{
          initialValue:faBars
        }
      }
    })
  }

  let handleDone=(event)=>{
    let content=event.target.parentElement.children[0].textContent;
    axios.post("https://manage-backend.onrender.com/delete-task",{content})
    .then(res=>{
      if(res){
        alert(res.data.message)
        window.location.reload();
      }
    })
    .catch(err=>console.log(err))
  }
    return(
        <div className="main-wrapper-homepage">
            <div className="navigation">
            <h1>Manage</h1>
            <FontAwesomeIcon icon={iconValue.initialValue} onClick={handleClick} className="hamburger-icon"/>
            <nav>
            <NavLink className="navLinks" to="/">Home</NavLink>
            <NavLink className="navLinks" to="/add-task">Add-Task</NavLink>
            <NavLink className="navLinks" onClick={()=>{
                localStorage.removeItem("isLogged");
                window.location.reload()
            }}>Logout</NavLink>
            </nav>
            </div>
            <div className="user-banner">
              <h2>Hello there, {userName} !</h2>
              <div className="tasks-banner">
                <h1 className="task-header">All of your tasks</h1>
                {data.length>0?
                 data.map(elements=>(
                  <div className="task-wrapper">
                    <div className="task-main-wrapper">
                      <h2>{elements.task}</h2>
                    </div>
                    <button onClick={handleDone}>Done</button>
                  </div>
                ))
              :
                <h2 className="no-task-header">No tasks as of yet!</h2>
              }
              </div>
            </div>
        </div>
    )
}

export default HomePage;
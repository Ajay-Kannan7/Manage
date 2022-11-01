import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
function HomePage(){

    //navbar code
  let [iconValue,handleIcon]=useState({
    initialValue:faBars
  })
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
  let userName=localStorage.getItem("user")
    return(
        <div>
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
            <h1>Hello there, {userName} !</h1>
        </div>
    )
}

export default HomePage;
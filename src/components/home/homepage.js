import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "./homepage.css"
import axios from "axios";
function HomePage(props){

  let [updatedValue,setUpdatedValue] = useState({
    update:""
  })

  let [updatedHeader, setHeader] = useState({
    content:""
  })
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
  let handleSearch = (event) =>{
    let taskHeader;
    let inputValue = event.target.value.toLowerCase();
    let allTasks = document.querySelectorAll(".task-wrapper");
    Array.from(allTasks).forEach(task=>{
      taskHeader = task.children[0].children[0].textContent.toLowerCase();
      if(taskHeader.indexOf(inputValue) !== -1){
        console.log("True")
        task.style.display = "flex";
      }
      else{
        console.log("False")
        task.style.display = "none";
      }
    })
  }
  let handleDialog = () =>{
    let openDialog = document.querySelectorAll(".update-button");
    let closeDialog = document.querySelectorAll(".close-dialog");
    let dialog = document.querySelector("dialog")
    openDialog.forEach(open =>{
      open.addEventListener("click",function(){
        setHeader({
          content:open.parentElement.children[0].textContent
        })
        dialog.showModal();
      })
    })
    closeDialog.forEach(open =>{
      open.addEventListener("click",function(){
        dialog.close();
      })
    })
  }
  let handleInputValue = (event) =>{
    let inputValue = event.target.value;
    setUpdatedValue({
      update:inputValue
    })
  }
  let handleUpdate = () =>{
    let enteredValue = updatedValue.update;
    let enteredHeader = updatedHeader.content;
    if(enteredValue == ""){
      alert("Update value can't be empty!")
      return;
    }
    axios.put("https://manage-backend.onrender.com/update-task",{enteredValue,enteredHeader})
    .then(res=>{
      alert(res.data.message);
      window.location.reload();
    })
    .catch(err=>{console.log(err)})
    console.log(enteredValue);
  }
  let handleDone=(event)=>{
    let content=event.target.parentElement.children[0].textContent;
    axios.post("https://manage-backend.onrender.com/delete-task",{content,userName})
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
            <NavLink className="navLinks" to="/tasks-done">Tasks-Done</NavLink>
            <NavLink className="navLinks" onClick={()=>{
                localStorage.removeItem("isLogged");
                window.location.reload()
            }}>Logout</NavLink>
            </nav>
            </div>
            <div className="user-banner">
              <h2>Hello there, {userName} !</h2>
              <div className="tasks-banner">
                <dialog className = "update-dialog" id="dialog">
                  <h1>Update task!</h1>
                  <input type="text" className="update-task" onChange={handleInputValue} placeholder="Search for your tasks!"></input><br></br>
                  <button className="close-dialog" onClick = {handleUpdate}>Update</button>
                </dialog>
                <h1 className="task-header">All of your tasks</h1>
                <input type="text" className="search-tasks" onChange={handleSearch} placeholder="Search for your tasks!"></input>
                {data.length>0?
                 data.map(elements=>(
                  <div className="task-wrapper">
                    <div className="task-main-wrapper">
                      <h2>{elements.task}</h2>
                    </div>
                    <button onClick={handleDialog} className="update-button">Update</button>
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
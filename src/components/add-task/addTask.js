import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import "./addTask.css"
function AddTask(){

    let userName=localStorage.getItem("user")
    let [formValues,handleForm]=useState({
        task:"",
    })

    let navigate=useNavigate();

    let handleClick=(event)=>{
        let {name,value}=event.target
        handleForm({
            ...formValues,
            [name]:value
        })
    }

    let addTask=()=>{
        axios.post("https://manage-backend.onrender.com/add-task",{formValues,userName})
        .then(res=>{
            if(res.data.message==="Task added successfully!"){
                alert(res.data.message);
                navigate("/")
            }
            
            else if(res.data.message="Task field can't be empty"){
                alert(res.data.message)
            }
        })
        .catch(err=>console.log(err))
    }

    
    return(
        <div className="main-wrapper">
            <div className="add-task-wrapper">
                <h1>Enter your task!</h1>
                <input type="text" placeholder="Enter your task" name="task" user={formValues.task} onChange={handleClick}></input>
                <button onClick={addTask}>Add task</button>
            </div>
            <Link className="homepage-link" to="/">Back to homepage!</Link>
        </div>
    )
}

export default AddTask
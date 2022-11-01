import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./login.css"
function LoginPage(){

    let navigate=useNavigate();
    let [formValues,handleForm]=useState({
        email:"",
        password:""
    })
    let handleChange=(event)=>{
        let {name,value}=event.target
        handleForm({
            ...formValues,
            [name]:value
        })
    }
    let login=()=>{
        axios.post("http://localhost:9000/login",formValues)
        .then(res=>{
            if(res.data.message==="Wrong credentials!"){
                alert(res.data.message);
            }
            else{
                navigate("/")
                localStorage.setItem("isLogged",true)
                localStorage.setItem("user",res.data.userName)
            }  
            window.location.reload();
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="login">
            <h1 className="main-logo">Manage</h1>
            <h1>Log-in</h1>
            <div className="login-page">
                <label>Enter your e-mail:</label><input value={formValues.email} name="email" onChange={handleChange} type="email" placeholder="Your email"></input>
                <label>Enter your password:</label><input value={formValues.password} name="password" onChange={handleChange} type="password" placeholder="Your password"></input>
                <button onClick={login}>Log-In</button>
            </div>
            <p>Haven't registered? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default LoginPage
import React from "react";
import Navbar from "../Navbar";
import { Link , useNavigate } from "react-router-dom";
import {useState} from 'react'
import M from 'materialize-css'
function Login(){
    const [email , setEmail] = useState("")
    const [password,setPassword] = useState("")
    let navigate = useNavigate();

    const onEmailChange = (input) => {
        setEmail(input.target.value)
        console.log(email)
    }
    const onPasswordChange = (input) => {
        setPassword(input.target.value)
        console.log(password)
    }

    const postResquest = () => {
        fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"},
            body: JSON.stringify({
                    email,
                    password
                })
        }).then(response => response.json())
        .then(result =>{
            if(result.error){
                M.toast({html: result.error ,classes:"#b71c1c red darken-4"})
                return
            }
            else{
                M.toast({html: "Signed in successfully" , classes:"#1b5e20 green darken-4"})
                navigate('/')
            }
        })
    }
    return(
        <div>
            <Navbar />
            <div className="mycard">
            <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input onChange={onEmailChange}  type="text" placeholder="email" />
            <input onChange={onPasswordChange} type="password" placeholder="password" />
            <button onClick={postResquest} className="btn waves-effect waves-light #64b5f6 blue lighten-2">Login</button><br /><br />
            <span><Link to='/signup'>I don't have account</Link></span>
            </div>
            </div>
        </div>
    )
}

export default Login
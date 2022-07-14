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
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#b71c1c red darken-4"})
            return
        }
        fetch("http://localhost:5000/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(response => response.json())
        .then(result => {
            if(result.error){
                M.toast({html: result.error ,classes:"#b71c1c red darken-4"})
            }
            else{
                localStorage.setItem("jwt",result.token)
                localStorage.setItem("user",JSON.stringify(result.user))
                // dispatch({type:"USER",payload:result.user})
                M.toast({html: "signed in success" , classes:"#1b5e20 green darken-4"})
                navigate('/')
            }
    }).catch(err => {console.log(err)})
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
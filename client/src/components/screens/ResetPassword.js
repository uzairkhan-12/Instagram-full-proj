import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
// import {UserContext} from '../../App'
import M from 'materialize-css'
function ResetPassword(){
    // const [state,dispatch] = useContext(UserContext)
    const [email , setEmail] = useState("")
    let navigate = useNavigate();

    const onEmailChange = (input) => {
        setEmail(input.target.value)
        console.log(email)
    }
  

    const postResquest = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#b71c1c red darken-4"})
            return
        }
        fetch("http://localhost:5000/reset-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(response => response.json())
        .then(result => {
            if(result.error){
                M.toast({html: result.error ,classes:"#b71c1c red darken-4"})
            }
            else{
                M.toast({html: result.message , classes:"#1b5e20 green darken-4"})
                navigate('/login')
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
            <button onClick={postResquest} className="btn waves-effect waves-light #64b5f6 blue lighten-2">Reset Password</button><br /><br />
            </div>
            </div>
        </div>
    )
}

export default ResetPassword
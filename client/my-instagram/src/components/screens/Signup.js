import React from "react";
import Navbar from "../Navbar";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import M from 'materialize-css'
function Signup(){

    const [name , setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();

    const onNameChange = (input) =>{
        console.log(name)
        setName(input.target.value)
    }

    const onEmailChange = (input) =>{
        console.log(email)
        setEmail(input.target.value)
        
    }

    const onPasswordChange = (input) =>{
        console.log(password)
        setPassword(input.target.value)
    }


    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#b71c1c red darken-4"})
            return
        }
        fetch("http://localhost:5000/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(response => response.json())
        .then(result => {
            if(result.error){
                M.toast({html: result.error ,classes:"#b71c1c red darken-4"})
            }
            else{
                M.toast({html: result , classes:"#1b5e20 green darken-4"})
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
            <input onChange={onNameChange} type="text" placeholder="name" />
            <input onChange={onEmailChange} type="email" placeholder="email" />
            <input onChange={onPasswordChange} type="password" placeholder="password" />
            <button onClick={postData} className="btn waves-effect waves-light #64b5f6 blue lighten-2">Signup</button><br /><br />
            <span><Link to='/login'>Already have an account?</Link></span>
            </div>
            </div>
        </div>
    )
}

export default Signup
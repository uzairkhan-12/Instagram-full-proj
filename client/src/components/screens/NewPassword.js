import React from "react";
import Navbar from "../Navbar";
import { Link , useNavigate,useParams } from "react-router-dom";
import {useState,useContext} from 'react'
// import {UserContext} from '../../App'
import M from 'materialize-css'
// import { useDispatch } from "react-redux";
// import { setActiveUser } from "../../redux/features/userSlice";
function NewPassword(){
    const {token} = useParams()
    console.log(token)
    const [password,setPassword] = useState("")
    let navigate = useNavigate();

    const onPasswordChange = (input) => {
        setPassword(input.target.value)
        console.log(password)
    }
//$2a$12$PiVQc70OyVfoSHUGKy7mZuXf976dPVGFxHNF4iN3y9WBBeUqeUSLS
    const postResquest = () => {
        fetch("http://localhost:5000/new-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
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
                // dispatch(setActiveUser(result.user))
                M.toast({html:result.message, classes:"#1b5e20 green darken-4"})
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
            <input onChange={onPasswordChange} type="password" placeholder="Enter new password" />
            <button onClick={postResquest} className="btn waves-effect waves-light #64b5f6 blue lighten-2">Update Password</button><br /><br />
            <h5><Link to='/signup'>I don't have account</Link></h5>
            <h6><Link to='/reset-password'>Forgot Password</Link></h6>
            </div>
            </div>
        </div>
    )
}

export default NewPassword
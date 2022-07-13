import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
function Login(){
    return(
        <div>
            <Navbar />
            <div className="mycard">
            <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input  type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Login</button><br /><br />
            <span><Link to='/signup'>I don't have account</Link></span>
            </div>
            </div>
        </div>
    )
}

export default Login
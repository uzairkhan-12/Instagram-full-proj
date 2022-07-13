import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
function Signup(){
    return(
        <div>
            <Navbar />
            <div className="mycard">
            <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input  type="text" placeholder="name" />
            <input  type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Signup</button><br /><br />
            <span><Link to='/login'>Already have an account?</Link></span>
            </div>
            </div>
        </div>
    )
}

export default Signup
import React from "react";
import Navbar from "../Navbar";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
function Profile(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.User.activeUser)
    const [myPics,setMyPics] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/my-posts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        })
        .then(res => res.json())
        .then(result => {
            setMyPics(result.myposts)
            
        })
    },[])
    return(
        <div>
            <Navbar />
           <div style={{display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    maxWidth:"550px",
                    margin:"0px auto"

        }}>
           <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
            src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTV8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
           </div>
           <div>
            <h4>{user? user.name : "loading"}</h4>
            <div>
                <span style={{marginRight:"20px"}}>40 posts</span>
                <span style={{marginRight:"20px"}}>40 followers</span>
                <span>120 following</span>
            </div>
           </div>
           </div>
           <div className="gallery">
            {
                myPics.map(item => {
                    return(<img
            key = {item._id}className="item" width="250px" height="250px" style={{marginLeft : "20px",marginRight:"20px" , marginTop:"20px",marginBottom:"50px"}} 
            src= {item.photo}
            />
            )
                })
            }
            
           </div>
        </div>
    )
}

export default Profile
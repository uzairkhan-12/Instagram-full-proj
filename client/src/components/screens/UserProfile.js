import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setActiveUser } from "../../redux/features/userSlice";
import {setActiveUserUpdate} from '../../redux/features/userSlice'
function UserProfile() {
    const { userid } = useParams()

    const user = useSelector(state => state.User.updateactiveUser)
    const dispatch = useDispatch()
    const user1 = useSelector(state => state.User.activeUser)
    console.log(user1)
    const [myPics, setMyPics] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const [showfollow,setShowFollow] = useState(user1? !user1?.following?.includes(userid):true)
    useEffect(() => {
        fetch('http://localhost:5000/user/' + userid, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                
                setUserProfile(result)

            })
    }, [])

    const followUser = () => {
        fetch('http://localhost:5000/follow',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res => res.json())
        .then(data => {
            dispatch(setActiveUserUpdate({following:data.following,followers:data.followers}))
            localStorage.setItem("user",JSON.stringify(data))
            console.log(data)
            setUserProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                       }
                }
            })
            setShowFollow(false)
       })
    }


    const unfollowUser = ()=>{
        fetch('http://localhost:5000/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch(setActiveUserUpdate({following:data.following,followers:data.followers}))
            localStorage.setItem("user",JSON.stringify(data))
            
             setUserProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
    return (
        <div>
            <Navbar />
           
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                maxWidth: "550px",
                margin: "0px auto"

            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src={userProfile?.user?.pic}
                    />
                </div>
                <div>
                    
                    <h4>{userProfile?.user?.name}</h4>
                    <h5>{userProfile?.user?.email}</h5>
                    <div>
                        <span style={{ marginRight: "20px" }}>{userProfile?.posts?.length} posts</span>
                        <span style={{ marginRight: "20px" }}>{userProfile?.user?.followers?.length} followers</span>
                        <span>{userProfile?.user?.following?.length} following</span>
                    </div>
                    
                    {showfollow?
                    <div>
                    <button onClick={() => {followUser()}} className="btn waves-effect waves-light #64b5f6 blue lighten-2">follow</button>
                </div>
                :
                <div>
                <button onClick={() => {unfollowUser()}} className="btn waves-effect waves-light #64b5f6 blue lighten-2">unfollow</button>
                    </div>
                }
                </div>
                 </div>
       
             <div className="gallery">
                {
                    userProfile?.posts?.map(item => {
                        return (<img
                            key={item._id} className="item" width="250px" height="250px" style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px", marginBottom: "50px" }}
                            src={item.photo}
                            />
                            )
                        })
                    }

            </div>
</div>
    )
}


export default UserProfile
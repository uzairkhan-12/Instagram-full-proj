import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setActiveUser } from "../../redux/features/userSlice";
function Profile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.User.activeUser)
    const [myPics, setMyPics] = useState([])
    const [image, setImage] = useState("")
    // const [url, setUrl] = useState(undefined)
    useEffect(() => {
        fetch('http://localhost:5000/my-posts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                setMyPics(result.myposts)

            })
    }, [])



    useEffect(() => {
        if(image){
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "instagramcloude")
            fetch("https://api.cloudinary.com/v1_1/instagramcloude/image/upload", {
                method: "Post",
                body: data,
    
            })
                .then(res => res.json())
                .then(data => {
                    // setUrl(data.url)
                    // console.log(data)
                    // localStorage.setItem("user",JSON.stringify({...user,pic:data.url}))
                    // dispatch(setActiveUser({pic:data.url}))
                    fetch('http://localhost:5000/update-pic',{
                        method:"put",
                        headers:{
                            "Content-Type":"Application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic:data.url
                        })
                    }).then(res => res.json())
                    .then(result => {
                        localStorage.setItem("user",JSON.stringify({...user,pic:result.pic}))
                        dispatch(setActiveUser({pic:result.pic}))
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },[image])
    const updatePic = (file) => {
        setImage(file)
        
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
                        src={user ? user.pic : "loading"}
                    />
                    <div className="file-field input-field" style={{marginTop:"10px",marginRight:"-300px"}}>
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update Profile</span>
                            <input onChange={(e)=>updatePic(e.target.files[0])} type="file" />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{user ? user.name : "loading"}</h4>
                    <h4>{user ? user.email : "loading"}</h4>
                    <div>
                        <span style={{ marginRight: "20px" }}>{myPics.length} posts</span>
                        <span style={{ marginRight: "20px" }}> {user?.followers?.length} followers</span>
                        <span>{user?.following?.length} following</span>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    myPics.map(item => {
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

export default Profile
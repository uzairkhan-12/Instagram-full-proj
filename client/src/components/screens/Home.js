import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate , Link } from "react-router-dom";
function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const user = useSelector(state => state.User.activeUser)
    useEffect(() => {
        fetch("http://localhost:5000/get-posts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setData(result)
            })
    }, [])
    const likePost = (id) => {
        fetch('http://localhost:5000/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const unLikePost = (id) => {
        fetch('http://localhost:5000/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch("http://localhost:5000/comment", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
                setData('')
            })
            .catch(err => {
                console.log(err)
            })
    }


    const deletePost = (postId) => {
        console.log('clicked', postId)
        fetch("http://localhost:5000/delete-post/"+ postId , {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }

    return (
        <div>
            <Navbar />
            <div className="home">
                {data && data.map(item => {
                    return <div className="card home-card" key={item?._id}>
                        
                        <h5 key='posted by'> <Link to={item?.postedBy?._id !== user._id? "/profile/"+item?.postedBy?._id: "/profile"}>{item?.postedBy?.name}{item?.postedBy?._id == user._id && <i onClick={() => deletePost(item?._id)} className="material-icons" style={{ float: "right " }}>delete</i>} </Link></h5>
                        <div className="card-image">
                            <img
                                src={item.photo}
                            />
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(user._id) ?
                                    <i style={{cursor : "pointer"}} className="material-icons" onClick={() => { unLikePost(item._id) }}>thumb_down</i> :
                                    <i style={{cursor : "pointer"}} className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                                }
                                <h6>{item.likes.length} Likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item?.comments?.map(record => {
                                        return (
                                            <h6 >
                                                <span key={record._id}><b>{record.postedBy.name} </b>{record.text}</span>
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="add a comment" />
                                </form>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home
import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import M from 'materialize-css'
function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    let navigate = useNavigate();

    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])


    const onNameChange = (input) => {
        console.log(name)
        setName(input.target.value)
    }

    const onEmailChange = (input) => {
        console.log(email)
        setEmail(input.target.value)

    }

    const onPasswordChange = (input) => {
        console.log(password)
        setPassword(input.target.value)
    }
    const onImageChange = (input) => {
        setImage(input.target.files[0])
        console.log(url)
    }

    const uploadPic = () => {
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
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })

    }



    const uploadFields = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#b71c1c red darken-4" })
            return
        }
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(response => response.json())
            .then(result => {
                if (result.error) {
                    M.toast({ html: result.error, classes: "#b71c1c red darken-4" })
                }
                else {
                    M.toast({ html: result, classes: "#1b5e20 green darken-4" })
                    navigate('/login')
                }
            }).catch(err => {
                console.log(err)
            })

    }

    const postData = () => {
        if (image) {
            uploadPic()
        }
        else {
            uploadFields()
        }
    }
        return (
            <div>
                <Navbar />
                <div className="mycard">
                    <div className="card auth-card input-field">
                        <h2>Instagram</h2>
                        <input onChange={onNameChange} type="text" placeholder="name" />
                        <input onChange={onEmailChange} type="email" placeholder="email" />
                        <input onChange={onPasswordChange} type="password" placeholder="password" />
                        <div className="file-field input-field">
                            <div className="btn #64b5f6 blue darken-1">
                                <span>Upload Data Profile</span>
                                <input onChange={onImageChange} type="file" />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                        <button onClick={() => postData()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">Signup</button><br /><br />
                        <h5><Link to='/login'>Already have an account?</Link></h5>
                        <h6><Link to='/reset-password'>Forgot Password</Link></h6>
                    </div>
                </div>
            </div>
        )
    }

    export default Signup
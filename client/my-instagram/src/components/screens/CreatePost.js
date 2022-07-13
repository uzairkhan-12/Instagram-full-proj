import React from "react";
import {useState} from 'react'

function CreatePost(){
  const [title , setTitle] = useState('')
  const [body , setBody] = useState('')
  const [image , setImage] = useState("")

  const onTitleChange = (input) => {
    setTitle(input.target.value)
  }

  const onBodyChange = (input) => {
    setBody(input.target.value)
  }

  const onImageChange = (input) => {
    setImage(input.target.files)
    console.log(image)
  }

  const postRequst = () => {
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","instagramcloude")
    fetch("https://api.cloudinary.com/v1_1/instagramcloude/image/upload", {
      method:"Post",
      body:data
    })
    .then(res=>res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
    return(
        <div className="card-input-filed" style={{
            margin : "10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input onChange={onTitleChange}  type='text' placeholder="title"/>
            <input onChange={onBodyChange} type='text' placeholder="title"/>
            <div class="file-field input-field">
      <div class="btn #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input onChange={onImageChange} type="file" />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" />
      </div>
      <button onClick={postRequst()} className="btn waves-effect waves-light #64b5f6 blue darken-1" style={{margin:"16px"}}>Submit post</button>
    </div>
        </div>
    )
}

export default CreatePost
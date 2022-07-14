import React from "react";
import {useState , useEffect} from 'react'
import M from 'materialize-css'
import { useNavigate } from "react-router-dom";
function CreatePost(){
  const [title , setTitle] = useState('')
  const [body , setBody] = useState('')
  const [image , setImage] = useState("")
  const [url , setUrl] = useState("")
  const navigate = useNavigate()
  const onTitleChange = (input) => {
    setTitle(input.target.value)
  }

  const onBodyChange = (input) => {
    setBody(input.target.value)
  }
  const onImageChange = (input) => {
    setImage(input.target.files[0])
    console.log(image)
  }



//   useEffect(()=>{
//     if(url){
     
//  }
//  },[url])


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
     setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
    fetch("/createpost",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
          // "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          title,
          body,
          pic:url
      })
  }).then(res=>res.json())
  .then(data=>{
     if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
     }
     else{
         M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
        navigate('/')
     }
  }).catch(err=>{
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
      <button onClick={()=>postRequst()} className="btn waves-effect waves-light #64b5f6 blue darken-1" style={{margin:"16px"}}>Submit post</button>
    </div>
        </div>
    )
}

export default CreatePost
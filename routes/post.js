const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requreLogin = require('../middleware/requreLogin')
const requireLogin = require('../middleware/requreLogin')
const Post = mongoose.model("Post")
router.post('/createpost',requireLogin,(req,res)=>{
    const {title , body , pic} = req.body
    if(!title || !body || !pic){
        res.status(422).json({error: "Please addd all the fields"})
    }
    console.log(req.user)
    console.log('ok')
    req.user.password=undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save()
    .then(result => {
        res.json({post:result})
    })
    .catch(err=>{
        res.json(err)
    })
})


router.get('/get-sub-posts',requireLogin,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then(posts => {
        // console.log(posts)
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/get-posts',requireLogin,(req,res)=>{
    Post.find().populate("postedBy","_id name")
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then(posts => {
        // console.log(posts)
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/my-posts', requireLogin , (req,res) => {
    
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name")
    .then(myposts => {
        res.json({myposts})
    })
    .catch(err => {console.log(err)})
})

router.put('/like',requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name")
    .exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

router.put('/unlike',requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})


router.put('/comment',requireLogin,(req,res) => {
    const comment = {
        text : req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})


router.delete('/delete-post/:postId',requireLogin,(req,res) => {
    console.log('api hitted', req.params.postId)
    Post.findOne({_id:req.params.postId})
    .exec((err , post) => {
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            }).catch(err => ()=> {console.log(err)})
        }
    })
})

module.exports = router 
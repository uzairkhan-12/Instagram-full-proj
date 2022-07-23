const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requreLogin')
//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
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"pk.uzikhan@gmail.com",
        pass:"kycrozhwuumudiiy"
        //  api_key:"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"
            // api_key:"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"
    },
    // form:"
    // "
})


router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})

router.post("/signup", (req, res) => {
    let { name, email, password , pic } = req.body
    if(!pic){
        pic='https://res.cloudinary.com/instagramcloude/image/upload/v1658314042/dp3_ozruse.png'
    }
    if (!name || !email || !password) {
        return res.status(422).send({ error: "OOps please Enter the data first" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).send({ error: "User already exist" })
            }
            bcrypt.hash(password ,12,)
            .then(hashedPassword => {
                const user = new User({
                    name,
                    email,
                    password:hashedPassword,
                    pic
                })
                user.save()
                    .then(user => {
                        transporter.sendMail({
                            to:user.email,
                            from:"no-reply@insta.com",
                            subject:"Signed up succeeded",
                            html:"<h3>Welcome to Instagram created by uzair</h3>"
                        }).then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log('error',err)
                        })

                        res.json("User created successfully")
                    })
                    .catch(err => { console.log("User creation faild",err) 
                })
            })
            
        })
   .catch(err => {console.log(err)
})

})
router.post("/signin" , (req,res)=> {
    const {email , password} = req.body
    if(!email || !password){
        res.status(422).send({error: "please enter the email and password"})
    }
    User.findOne({email : email})
    .then(savedUser=> {
        if(!savedUser){
            return res.status(422).send({error:"User not exist"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(isMatch => {
            if(isMatch){
                const token = jwt.sign({_id : savedUser._id}, JWT_SECRET)
                const {_id , name , email , followers , following , pic} = savedUser
                res.json({token,user:{_id , name , email , followers , following,pic }})
            }
            else return res.json("Invalid password")
        })
    })
    .catch(err => {
        console.log("Error",err)
    })
})


router.post('/reset-password',(req,res) => {
    crypto.randomBytes(32,(err , buffer) => {
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({error : "User dont exist with given email"})
            }
            user.resetToken= token
            user.expireToken= Date.now() + 3600000
            user.save()
            .then((result) => {
                transporter.sendMail({
                    to:user.email,
                    from:"noreply@insta.com",
                    subject:"Reset password by Insta by Uzair",
                    html:`
                    <P>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message : "Check your Gmail "})
            })
        })
    })
})

router.post('/new-password',(req,res) => {
    console.log('api hitted')
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user => {
        if(!user){
            return res.statusCode(422).json({error : "Try again session expired!"})
        }
        bcrypt.hash(newPassword,12).then(hashedPassword=>{
            user.password = hashedPassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save().then((savedUser)=> {
                res.json({message:"password updated success"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})
module.exports = router
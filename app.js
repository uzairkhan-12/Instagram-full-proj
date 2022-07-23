 const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const { MONGOURI } = require('./config/keys')
require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
mongoose.connect(MONGOURI)
mongoose.connection.on('connected' , () => {
    console.log("connected to mongo Hurry!...")
})


// app.use(require('./routes/auth'))




mongoose.connection.on('error' , (err) => {
    console.log("OOPS... Something went wrong" ,err)
})


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require("path")
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}


app.listen(PORT, () => {console.log("server is running on...",PORT)})
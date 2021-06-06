const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/contactDB'

const app = express()

mongoose.connect(
    url,{
        userNewUrlParser:true
    }
)
var cors = require('cors')
app.use(cors())

const con = mongoose.connection

app.use(express.json())

const contactRouter = require('./routes/index')
app.use('/api',contactRouter)

con.on('open',function() {
    console.log("connected to bd")
})

app.listen(3000, function(){
    console.log("Server Started")
})


const path = require('path')
const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const api = require('./routes/api')


const app = express()
// app.use(cors())//if we do this, cors will allow all websites to access to the database.

app.use(cors ({
    origin: 'http://localhost:3000'
}))

//?morgan is for logging purposes. It logs what user done in the website
app.use(morgan('combined'))

app.use(express.json())
//?Now, port 8000 can be used either by front or back (when running from server folder)
app.use(express.static(path.join(__dirname,'..','public'))) //we use this for public folder and server uses the same port

//!Due to we took public from frontend, it won't be routed automatically. We have to tell to go to index.html
//?If previous routes didn't work, send the index.html file

app.use('/v1',api) //it'll start with localhost/v1/...

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = app
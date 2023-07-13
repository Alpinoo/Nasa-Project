const path = require('path')
const express = require('express')
const planetsRouter = require('./routes/planets/planetsRouter')
const cors = require('cors')


const app = express()
// app.use(cors())//if we do this, cors will allow all websites to access to the database.

app.use(cors ({
    origin: 'http://localhost:3000'
    }))

app.use(express.json())
//?Now, port 8000 can be used either by front or backe (when running from server folder)
app.use(express.static(path.join(__dirname,'..','public'))) //we use this for public folder and server uses the same port

app.use(planetsRouter)

module.exports = app
const express = require('express')
const planetsRouter = require('./routes/planets/planetsRouter')
const cors = require('cors')


const app = express()
// app.use(cors())//if we do this, cors will allow all websites to access to the database.

const whiteList = ['http://localhost:3000']
app.use(cors({
    origin: (origin,callback)=>{
        if(whiteList.indexOf(origin) != -1){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}))

app.use(express.json())
app.use(planetsRouter)

module.exports = app
const http = require('http')
const PORT = process.env.PORT || 8000
const app = require('./app')
const {mongoConnect} = require('../services/mongoDB')

require('dotenv').config()// for setting dotenv

const {loadLaunch} = require('./models/launcesModel')
const {loadPlanets} = require('./models/planetsModel')

const server = http.createServer(app)



//!reading csv is async. So, we create an async function to read its data before server starts
const startServer = async ()=>{
    await mongoConnect()
    await loadPlanets()
    await loadLaunch()
    server.listen(PORT, ()=>{
        console.log(`Server started in port ${PORT}...`);
    })
}
startServer()




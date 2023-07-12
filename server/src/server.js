const http = require('http')
const PORT = process.env.PORT || 8000
const app = require('./app')

const server = http.createServer(app)


const {run} = require('./models/planetsModel')


//!reading csv is async. So, we create an async function to read its data before server starts
const startServer = async ()=>{
    await run
    server.listen(PORT, ()=>{
        console.log(`Server started in port ${PORT}...`);
    })
}
startServer()




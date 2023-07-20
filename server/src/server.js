const http = require('http')
const PORT = process.env.PORT || 8000
const app = require('./app')
const mongoose = require('mongoose')

const server = http.createServer(app)


const {run} = require('./models/planetsModel')

const MONGO_URL = 'mongodb+srv://alporal97:a6pYupPKKoBiZ2iK@nasaproject.g3vsjs4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{ //once means that this will be triggered only one time
    console.log('MongoDB is active');
})

mongoose.connection.on('error',(err)=>{//.on describes an event. We use it to determine what to do when the event triggered
    console.error(err);
})



//!reading csv is async. So, we create an async function to read its data before server starts
const startServer = async ()=>{
    await mongoose.connect(MONGO_URL)
    await run
    server.listen(PORT, ()=>{
        console.log(`Server started in port ${PORT}...`);
    })
}
startServer()




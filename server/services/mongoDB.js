const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://alporal97:a6pYupPKKoBiZ2iK@nasaproject.g3vsjs4.mongodb.net/?retryWrites=true&w=majority'


mongoose.connection.once('open',()=>{ //once means that this will be triggered only one time
    console.log('MongoDB is active');
})

mongoose.connection.on('error',(err)=>{//.on describes an event. We use it to determine what to do when the event triggered
    console.error(err);
})

const mongoConnect = async()=>{
    await mongoose.connect(MONGO_URL)

}

const mongoDisconnect = async ()=>{
    await mongoose.disconnect()
}
module.exports = {mongoConnect, mongoDisconnect}

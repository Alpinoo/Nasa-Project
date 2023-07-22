const mongoose = require('mongoose')

require('dotenv').config();//for tests to recognize mongo's url

const MONGO_URL = process.env.MONGO_URL


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

const mongoose = require('mongoose')

const planetsSchema = new mongoose.Schema({
    keplerName:{
        type:String,
        required:true
    }
})

//*mongoose will first lowercase the name, make it plural and create model 'planets'.
module.exports = mongoose.model('Planet',planetsSchema)
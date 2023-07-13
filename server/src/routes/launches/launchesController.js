const {launches} = require('../../models/launcesModel')

const getAllLaunches = (req,res)=>{
    return res.json(Array.from(launches.values()))//maps cannot converted to json. First, we have to convert to array so that it can be converted to json
    //?also added .values() for iterating over values.
}

module.exports = getAllLaunches
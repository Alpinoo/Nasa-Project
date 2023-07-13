const launcesModel = require('../../models/launcesModel')

const getAllLaunches = (req,res)=>{
    return res.json(launcesModel.getLaunches())
}

module.exports = getAllLaunches
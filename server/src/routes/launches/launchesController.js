const {getLaunches,createLaunch} = require('../../models/launcesModel')

const getAllLaunches = (req,res)=>{
    return res.json(getLaunches())
}

const addLaunch = (req,res)=>{
    const launch = req.body
    launch.launchDate = new Date(launch.launchDate)
    const createdLaunch = createLaunch(launch)
    return res.status(201).json(createdLaunch)
}

module.exports ={ getAllLaunches,addLaunch}
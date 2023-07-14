const {getLaunches,createLaunch} = require('../../models/launcesModel')

const getAllLaunches = (req,res)=>{
    return res.json(getLaunches())
}

const addLaunch = (req,res)=>{
    const launch = req.body
    if(!launch.launchDate || !launch.mission || !launch.rocket || !launch.destination){
        return res.status(400).json({
            error: 'Some of the required fields are missing'
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){ //?Behind the scenes, js calls launchDate.values() and returns a number(timestamp) or NaN. If NaN, it means that it's not a date
        return res.status(400).json({
            error: 'Invalid date'
        })
    }
    const createdLaunch = createLaunch(launch)
    return res.status(201).json(createdLaunch)
}

module.exports ={ getAllLaunches,addLaunch}
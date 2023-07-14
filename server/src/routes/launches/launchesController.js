const {getLaunches,createLaunch,checkLaunch,deleteLaunch} = require('../../models/launcesModel')

const getAllLaunches = (req,res)=>{
    return res.json(getLaunches())
}

const addLaunch = (req,res)=>{
    const launch = req.body
    if(!launch.launchDate || !launch.mission || !launch.rocket || !launch.target){
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

const abortLaunch = (req,res)=>{
    const launchId = Number(req.params.id) //converted it because in req.params, it's a string but we want it as number because defined in object as number
    const aborted = deleteLaunch(launchId)
    
    //if exists -> delete it
    if(checkLaunch(launchId)){
        return res.status(200).json({aborted})
    }else{
        return res.status(404).json({
            error: 'Launch cannot found'
        })
    }
}

module.exports ={ getAllLaunches,addLaunch, abortLaunch}
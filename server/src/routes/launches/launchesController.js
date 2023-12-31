const {getLaunches,scheduleLaunch,checkLaunch,deleteLaunch} = require('../../models/launcesModel')

const getAllLaunches = async (req,res)=>{
    const launches = await getLaunches(req.query)
    return res.status(200).json(launches)
}

const addLaunch = async(req,res)=>{
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
    await scheduleLaunch(launch)
    return res.status(201).json(launch)
}

const abortLaunch = async (req,res)=>{
    const launchId = Number(req.params.id) //converted it because in req.params, it's a string but we want it as number because defined in object as number
    
    const existLaunch = await checkLaunch(launchId)
    //if exists -> delete it
    if(!existLaunch){
        return res.status(404).json({
            error: 'Launch cannot found'
        })
    }
    const aborted = await deleteLaunch(launchId)
    if(!aborted){
        res.status(400).json({
            error: 'Cannot abort the launch'
        })
    }
    return res.status(200).json({
        "ok": true
    })
}

module.exports ={ getAllLaunches,addLaunch, abortLaunch}
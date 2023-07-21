//!Now, we have more than one cluster. It means that when we create a new launches map, it'll be created only for that cluster. So, when 
//!there's another operation (ex:get launches) in another cluster, we can't reach to the cluster's data which launch was created. we should use database. 
const launchesDB =require('./launchesSchema')
const planetsDB = require('./planetsSchema')

//?we used map because it's flexible to change and update.
const launches = new Map()

let latestFlightNumber = 100;

const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
    flightNumber : 100,
    mission: 'Hello There',
    rocket: 'Star Citizen',
    target: 'Kepler-62 f',
    launchDate: new Date('28 January 2030'),
    customers: ['Alpino', 'Kenobi'],
    success:true,
    upcoming: true
}

//?For setting launches. Used flightNumber as text because it's unique
launches.set(launch.flightNumber,launch)

const getLaunches = async ()=>{
    return await launchesDB.find({},{
        '__v':0,
        '_id':0
    })

    // return Array.from(launches.values())//maps cannot converted to json. First, we have to convert to array so that it can be converted to json
    //?also added .values() for iterating over values.
}
const scheduleLaunch = async (launch)=>{
    const flightNum = await getLatestFlightNumber() + 1
    launch.flightNumber = flightNum 
    launch.success = true,
    launch.upcoming = true
    await saveLaunch(launch)
}

const getLatestFlightNumber = async()=>{ //sort documents and take the latest flight number accordingly
    const latestFlight = await launchesDB.findOne().sort('-flightNumber')

    if(!latestFlight){
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestFlight.flightNumber
}

const saveLaunch = async (launch)=>{ //*find the flightNumber of the launch and update it with the launch object. If there's not, create it.
    const planets = await planetsDB.findOne({ //check if planet name exists on the planets database
        keplerName: launch.target
    })
    if(!planets){
        throw new Error('Planet name is not in the list of planets')
    }
    await launchesDB.findOneAndUpdate({//we changed this from updateOne because it sends setOnInsert propery as response
        flightNumber:launch.flightNumber
    },launch,{
        upsert: true
    })
}
saveLaunch(launch)

const checkLaunch = async(id)=>{
    return await launchesDB.findOne({
        flightNumber:id
    })

}

const deleteLaunch = async (id) => {
    const aborted = await launchesDB.updateOne({
        flightNumber:id
    },{
        success:false,
        upcoming:false 
    })

    return aborted.modifiedCount ===1  //we did this because it's one of the responses that came from updateOne json. It's more elegant.
}


module.exports = {
    getLaunches,
    scheduleLaunch,
    checkLaunch,
    deleteLaunch
}
//!Now, we have more than one cluster. It means that when we create a new launches map, it'll be created only for that cluster. So, when 
//!there's another operation (ex:get launches) in another cluster, we can't reach to the cluster's data which launch was created. we should use database. 
const launchesDB =require('./launchesSchema')

//?we used map because it's flexible to change and update.
const launches = new Map()

let latestFlightNumber = 100;

const launch = {
    flightNumber : 100,
    mission: 'Hello There',
    rocket: 'Star Citizen',
    target: 'Moon',
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
const createLaunch = (launch)=>{
    latestFlightNumber++
    launch.flightNumber = latestFlightNumber
    launch.customers = ['Kenobi', 'Skywalker'] 
    launch.success = true
    launch.upcoming = true
    launches.set(launch.flightNumber,launch)
    return launch
}

const saveLaunch = async (launch)=>{ //*find the flightNumber of the launch and update it with the launch object. If there's not, create it.
    await launchesDB.updateOne({
        flightNumber:launch.flightNumber
    },launch,{
        upsert: true
    })
}

saveLaunch(launch)

const checkLaunch = (id)=>{
    return launches.has(id)
}

const deleteLaunch = (id) => {
    const aborted = launches.get(id)
    aborted.success = false,
    aborted.upcoming = false 
    return aborted
}


module.exports = {
    getLaunches,
    createLaunch,
    checkLaunch,
    deleteLaunch
}
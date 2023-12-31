//!Now, we have more than one cluster. It means that when we create a new launches map, it'll be created only for that cluster. So, when 
//!there's another operation (ex:get launches) in another cluster, we can't reach to the cluster's data which launch was created. we should use database. 
const launchesDB =require('./launchesSchema')
const planetsDB = require('./planetsSchema')
const {getPagination} = require('../../services/query')
const axios = require('axios')

//?we used map because it's flexible to change and update.
const launches = new Map()

let latestFlightNumber = 100;

const DEFAULT_FLIGHT_NUMBER = 100


const SPACEX_URL = 'https://api.spacexdata.com/v4/launches/query'

const populateLaunch = async ()=>{

    console.log('Launches downloading...');
    const response = await axios.post(SPACEX_URL,{ //we're getting launches data from spaceX. There's no get query route so, we use post to use queries or populate
        query:{},
        options:{
            pagination: false, //spacex limits the number of docs per page to 10 but we need all the data
            populate:[
                {
                    path: 'rocket',
                    select:{
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select:{
                        customers: 1
                    }
                }
            ]
        }   
    })

    if(response.status !== 200){
        console.log(`There's a problem while downloading data from SpaceX`);
        throw new Error('Problem while downloading')
    }

    const launchDocs = response.data.docs
    for(const launchDoc of launchDocs){
        const payloads = launchDoc.payloads
        const customers = payloads.flatMap((payload)=>{//payload.customers is an array of arrays. So, we flatMap it and create one array with customers
            return payload.customers
        })
        const launch = {
            flightNumber: launchDoc.flight_number,
            mission: launchDoc.name, 
            rocket: launchDoc.rocket.name, 
            launchDate: launchDoc.date_local,
            customers, 
            success:launchDoc.success, 
            upcoming: launchDoc.upcoming
        }
        await saveLaunch(launch)
    }

}

const loadLaunch = async ()=>{
    const firstLaunch = await findLaunch({
        flightNumber:1,
        mission:'FalconSat',
        rocket: 'Falcon 1'
    })
    if(firstLaunch){
        console.log('First launch already downloaded');
    }else{
        await populateLaunch()
    }
}

const getLaunches = async (query)=>{
    const {limit,skip} = getPagination(query)
    return await launchesDB.find({},{
        '__v':0,
        '_id':0
    }).sort({flightNumber:1}).limit(limit).skip(skip)

    // return Array.from(launches.values())//maps cannot converted to json. First, we have to convert to array so that it can be converted to json
    //?also added .values() for iterating over values.
}
const scheduleLaunch = async (launch)=>{
    const planets = await planetsDB.findOne({ //check if planet name exists on the planets database
        keplerName: launch.target
    })
    if(!planets){
        throw new Error('Planet name is not in the list of planets')
    }
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
    await launchesDB.findOneAndUpdate({//we changed this from updateOne because it sends setOnInsert propery as response
        flightNumber:launch.flightNumber
    },launch,{
        upsert: true
    })
}

const findLaunch = async (filter)=>{
    return await launchesDB.findOne(filter)
}

const checkLaunch = async(id)=>{
    return await findLaunch({
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
    loadLaunch,
    getLaunches,
    scheduleLaunch,
    checkLaunch,
    deleteLaunch
}
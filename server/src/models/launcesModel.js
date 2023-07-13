//?we used map because it's flexible to change and update.
const launches = new Map()

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

const getLaunches = ()=>{
    return Array.from(launches.values())//maps cannot converted to json. First, we have to convert to array so that it can be converted to json
    //?also added .values() for iterating over values.
}

module.exports = {
    getLaunches
}
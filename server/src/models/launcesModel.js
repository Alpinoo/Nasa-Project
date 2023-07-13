//?we used map because it's flexible to change and update.
const launches = new Map()

const launch = {
    flightNumber : 100,
    mission: 'Hello There',
    rocketType: 'Star Citizen',
    destination: 'Moon',
    launchDate: new Date('28 January 2030'),
    customers: ['Alpino', 'Kenobi'],
    success:true,
    upcoming: true
}

//?For setting launches. Used flightNumber as text because it's unique
launches.set(launch.flightNumber,launch)

module.exports = {
    launches
}
const fs = require('fs');
const path = require('path')
const {parse} = require('csv-parse');

const planets = require('./planetsSchema')

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

//!reading stream is an asynchronous job. We have to read csv before the page opens. To do so, we created a promise that handles.
const run = new Promise((resolve,reject)=>{
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async(data) => {
        if (isHabitablePlanet(data)) {
          // await planets.create({ //!this is not ideal because whenever we restart the server, planets will be created again and again. We should use update + insert = upsert
          //   keplerName: data.keplerName
          // })
          savePlanets(data)
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err) //if there's an error, exit with reject
      })
      .on('end', () => {
        resolve() // when it's done, resolve() to fulfill the promise
      });

})

const getPlanets = async ()=>{
  return await planets.find({},{
    '_id':0,
    '__v':0
  }) //if we want to exclude a field, planets.find({}, '-excludedField')
}

const savePlanets = async (planet)=>{
  //*
  await planets.updateOne({
    keplerName: planet.keplerName //this is what should mongoose look for (filter)
  },{
    keplerName: planet.keplerName //what should mongoose update
  },{
    upsert: true //if there's no document found, add that to database
  })
}


module.exports = {
    run,
    getPlanets 
}
const fs = require('fs');
const path = require('path')
const {parse} = require('csv-parse');

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
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
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

const getPlanets = ()=>{
  return habitablePlanets
}


module.exports = {
    run,
    getPlanets 
}
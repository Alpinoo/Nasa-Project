const planets = require('../../models/planetsModel')

const getPlanets = (req,res)=>{
    return res.status(200).json(planets) 
}

module.exports = {getPlanets}
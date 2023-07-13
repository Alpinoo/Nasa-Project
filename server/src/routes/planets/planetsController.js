const planetsModel = require('../../models/planetsModel')

const getAllPlanets = (req,res)=>{
    return res.status(200).json(planetsModel.getPlanets()) 
}

module.exports = {getAllPlanets}
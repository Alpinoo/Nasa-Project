const planetsModel = require('../../models/planetsModel')

const getAllPlanets = async (req,res)=>{
    return res.status(200).json(await planetsModel.getPlanets()) 
}

module.exports = {getAllPlanets}
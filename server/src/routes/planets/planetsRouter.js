const express = require('express')
const {getAllPlanets} = require('./planetsController')

const planetsRouter = express.Router()

planetsRouter.get('/',getAllPlanets)

module.exports = planetsRouter
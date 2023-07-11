const express = require('express')
const {getPlanets} = require('./planetsController')

const planetsRouter = express.Router()

planetsRouter.get('/planets',getPlanets)
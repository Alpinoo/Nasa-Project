const express = require('express')
const launchesRouter = express.Router()
const getAllLaunches = require('../launches/launchesController')

launchesRouter.get('/launches',getAllLaunches)

module.exports = launchesRouter
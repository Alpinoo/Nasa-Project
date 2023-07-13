const express = require('express')
const launchesRouter = express.Router()
const {getAllLaunches,addLaunch} = require('../launches/launchesController')


launchesRouter.get('/',getAllLaunches)
launchesRouter.post('/',addLaunch)

module.exports = launchesRouter
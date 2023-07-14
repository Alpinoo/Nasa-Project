const express = require('express')
const launchesRouter = express.Router()
const {getAllLaunches,addLaunch,abortLaunch} = require('../launches/launchesController')


launchesRouter.get('/',getAllLaunches)
launchesRouter.post('/',addLaunch)
launchesRouter.delete('/:id',abortLaunch)

module.exports = launchesRouter
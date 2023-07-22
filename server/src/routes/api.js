//!We made this for versioning the code. If there's v2, we can handle it in the app.js
const express = require('express')


const planetsRouter = require('./planets/planetsRouter')
const launchesRouter = require('./launches/launchesRouter')
const api = express.Router()

api.use('/planets',planetsRouter)
api.use('/launches',launchesRouter)


module.exports = api
const express = require('express')
const app = express()
const moviesRouter = require('./movie')
const schedulesRouter = require('./schedule')
const bookingRouter = require('./booking')



app.use('/movies', moviesRouter)
app.use('/schedules', schedulesRouter)
app.use('/booking', bookingRouter)


module.exports = app
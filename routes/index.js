const express = require('express')
const app = express()
const moviesRouter = require('./movie')
const schedulesRouter = require('./schedule')
const bookingRouter = require('./booking')
const authRouter = require('./auth')
const cinemaRouter = require('./cinema')
const userRouter = require('./users')



app.use('/movies', moviesRouter)
app.use('/schedules', schedulesRouter)
app.use('/booking', bookingRouter)
app.use('/auth', authRouter)
app.use('/cinema', cinemaRouter)
app.use('/users', userRouter)


module.exports = app
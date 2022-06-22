const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const app = express()

app.use((req, res, next) => {
    res.append("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
    next()
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const moviesRouter = require('./routes/movies/movies')
const schedulesRouter = require('./routes/schedules/schedules')

app.get('/', (req, res) => res.send('Services working perfectly.'))

app.use('/api/v1/movies', moviesRouter)
app.use('/api/v1/schedules', schedulesRouter)


app.listen(process.env.PORT, () => {
    console.log(`Ticktiz BE listening on port ${process.env.PORT}`)
})
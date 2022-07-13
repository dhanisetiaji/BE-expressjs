const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const app = express()
const router = require('./routes/index')
const { format, transports } = require('winston'),
    expressWinston = require('express-winston');
const { timestamp, combine, errors, json } = format
const path = require('path')

// app.use((req, res, next) => {
//     res.append("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
//     next()
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(expressWinston.logger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' })
    ],
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: false,
    meta: false,
    statusLevels: true,
    ignoreRoute: function (req, res) { return false; }
}))
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', router)

app.get('/', (req, res) => res.send('Services working perfectly.'))

app.listen(process.env.PORT || 3000, () => {
    console.log(`PORT: ${process.env.PORT}`)
})

// module.exports = app
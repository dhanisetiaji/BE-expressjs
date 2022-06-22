const mysql = require('mysql')
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('DB Connected!');
    }
});


module.exports = connection; 
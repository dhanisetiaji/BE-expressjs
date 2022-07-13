const db = require('../helpers/db')

const get = async (req, res) => {
    return new Promise((resolve, reject) => {
        const { q } = req.query
        db.query(`SELECT * FROM cinemas ${q ? `WHERE name_cinema LIKE '%${q}%' OR address_cinema LIKE '%${q}%'` : ''}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: `Error!, ${err.code}`,
                })
            } if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Bad Request, data not found!',
                })
            } else {
                resolve({
                    success: true,
                    status: 200,
                    message: 'successfully get data',
                    data: results
                })
            }
        })
    })
}

const add = async (req, res) => {
    return new Promise((resolve, reject) => {
        const { name_cinema, address_cinema } = req.body
        db.query(`INSERT INTO cinemas (name_cinema, address_cinema) VALUES ('${name_cinema}', '${address_cinema}')`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else {
                resolve({
                    success: true,
                    status: 200,
                    message: 'successfully add data',
                    data: {
                        id: results.insertId,
                        name_cinema,
                        address_cinema
                    }
                })
            }
        })
    })
}


module.exports = {
    get,
    add
}
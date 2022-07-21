const db = require('../helpers/db')
const fs = require('fs')

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
        const { name_cinema, address_cinema, image_cinema } = req.body
        db.query(`INSERT INTO cinemas (name_cinema, address_cinema, image_cinema) VALUES ('${name_cinema}', '${address_cinema}', '${image_cinema}')`, (err, results) => {
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

const update = async (req, res) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM cinemas WHERE id=${req.params.id}`, (err, results) => {
            if (err) {
                // console.log(err)
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Bad Request, data not found!',
                })
            } else {
                let prevData = {
                    ...results[0],
                    ...req.body
                }
                if (req.body.image_cinema == '') {
                    prevData = {
                        ...prevData,
                        image_cinema: results[0].image_cinema
                    }
                }
                if (req.body.image_cinema !== '' && !req.body.image_cinema) {
                    if (results[0].image_cinema !== req.body.image_cinema) {
                        fs.unlink(`uploads/${results[0].image_cinema}`, (err) => {
                            if (err) {
                                reject({
                                    success: false,
                                    status: 500,
                                    message: err.code,
                                })
                            }
                        })
                        prevData = {
                            ...prevData,
                            image: req.file.filename
                        }
                    }
                }
                const { name_cinema, address_cinema, image_cinema } = prevData
                db.query(`UPDATE cinemas SET name_cinema = '${name_cinema}', address_cinema = '${address_cinema}', image_cinema = '${image_cinema}' WHERE id = ${req.params.id}`, (err, results) => {
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
                            message: 'successfully update data',
                            data: {
                                id: req.params.id,
                                name_cinema,
                                address_cinema
                            }
                        })
                    }
                })
            }
        })
    })
}

const remove = async (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cinemas WHERE id=${req.params.id}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Bad Request, data not found!',
                })
            } else {
                const imagetmp = results[0].image_cinema
                db.query(`DELETE FROM cinemas WHERE id = ${req.params.id}`, (err, results) => {
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
                        fs.unlink(`uploads/${imagetmp}`, (err) => {
                            if (err) {
                                reject({
                                    success: false,
                                    status: 500,
                                    message: err.code,
                                })
                            }
                        })
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully delete data',
                            data: {
                                id: req.params.id
                            }
                        })
                    }
                })
            }
        })
    })
}


module.exports = {
    get,
    add,
    update,
    remove
}
const db = require('../helpers/db')

// const get = async () => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM schedules', (err, results) => {
//             if (err) {
//                 reject({
//                     success: false,
//                     status: 500,
//                     message: 'Error!',
//                     data: err
//                 })
//             } else {
//                 resolve({
//                     success: true,
//                     status: 200,
//                     message: 'successfully get data',
//                     data: results
//                 })
//             }
//         })
//     })
// }

const get = async () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT a.*,b.name_cinema,b.address_cinema,b.image_cinema from schedules as a JOIN cinemas AS b WHERE a.id_cinema = b.id`,
            (err, results) => {
                if (err) {
                    reject({
                        success: false,
                        status: 500,
                        message: 'Error!',
                        data: err
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
        const { id_movie, id_cinema, time, price } = req.body
        // console.log(JSON.stringify(time))
        db.query(`INSERT INTO schedules (id_movie,id_cinema,time,price) VALUES ('${id_movie}','${id_cinema}',${JSON.stringify(time)},'${price}')`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: err
                })
            } else {
                resolve({
                    success: true,
                    status: 200,
                    message: 'successfully add data',
                    data: {
                        id: results.insertId,
                    }
                })
            }
        })
    })
}

const update = async (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from schedules where id=${req.params.id}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: err
                })
            } else if (results.length === 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'bad request. data not found',
                })
            } else {
                let prevData = {
                    ...results[0],
                    ...req.body
                }
                db.query(`UPDATE schedules SET id_movie='${prevData.id_movie}',id_cinema='${prevData.id_cinema}',time=${JSON.stringify(prevData.time)},price='${prevData.price}' WHERE id=${req.params.id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: 'Error!',
                            data: err
                        })
                    } else {
                        reject({
                            success: true,
                            status: 200,
                            message: 'successfully update data',
                            data: {
                                id: req.params.id,
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
        db.query(`SELECT id from schedules where id=${req.params.id}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: err
                })
            } else if (results.length === 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Bad Request, data not found!',
                })
            } else {
                db.query(`DELETE FROM schedules WHERE id=${req.params.id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: 'Error!',
                            data: err
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully delete data',
                            data: {
                                id: req.params.id,
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
const db = require('../helpers/db')

const get = async () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT a.seat,a.time,b.title,c.name_cinema,c.image_cinema,d.price FROM booking AS a JOIN movie AS b JOIN cinemas as C JOIN schedules AS d WHERE a.id_movie=b.id AND a.id_cinema=c.id AND a.id_schedule= d.id`,
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
        const { id_movie, id_cinema, id_schedule, seat, time } = req.body
        db.query(`INSERT INTO booking (id_movie,id_cinema,id_schedule,seat,time) VALUES ('${id_movie}','${id_cinema}','${id_schedule}',${JSON.stringify(seat)},'${time}')`, (err, results) => {
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
        db.query(`SELECT * from booking where id=${req.params.id}`, (err, results) => {
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
                const { id_movie, id_cinema, id_schedule, seat, time } = prevData
                db.query(`UPDATE booking SET id_movie='${id_movie}',id_cinema='${id_cinema}',id_schedule='${id_schedule}',seat=${JSON.stringify(seat)},time='${time}' WHERE id=${req.params.id}`, (err, results) => {
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
        db.query(`SELECT id from booking where id=${req.params.id}`, (err, results) => {
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
                db.query(`DELETE FROM booking WHERE id=${req.params.id}`, (err, results) => {
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
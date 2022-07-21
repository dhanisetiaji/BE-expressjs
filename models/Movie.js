const db = require('../helpers/db')
const fs = require('fs')

const get = async (req, res) => {
    const { q, date, orderBy } = req.query
    const p = parseInt(req.query.page)
    const l = parseInt(req.query.limit)
    // console.log(s, 'start', l, 'limit')
    const yearNow = new Date().getFullYear()
    const offset = (p - 1) * l
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM movie ${date ? `WHERE release_date LIKE '%${yearNow}-${date}%'` : q ? `WHERE id LIKE '%${q}%' OR title LIKE '%${q}%' OR genre LIKE '%${q}%' OR release_date LIKE '%${q}%' OR directed_by LIKE '%${q}%' OR duration LIKE '%${q}%' OR cast LIKE '%${q}%' OR synopsis LIKE '%${q}%'` : orderBy ? `ORDER BY title ${orderBy}` : ''} ${p && l ? `LIMIT ${l} OFFSET ${offset}` : ''}`, (err, results) => {
            if (err) {
                console.log(err)
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else {
                db.query(`SELECT id from movie`, (err, results1) => {
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
                        totalPage = Math.ceil(results1.length / l)
                        if (isNaN(l) && isNaN(p)) {
                            totalPage = 1
                        }
                        if (p > totalPage) {
                            reject({
                                success: false,
                                status: 400,
                                message: 'Bad Request, page not found!',
                            })
                        }
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully get data',
                            data: {
                                results: results.map(result => {
                                    return {
                                        ...result,
                                        release_date: result.release_date.toISOString().split('T')[0]
                                    }
                                }),
                                totalAllData: results1.length,
                                totalRows: results.length,
                                totalPage: totalPage
                            }
                        })
                    }
                })

            }
        })
    })
}

const getById = async (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM movie WHERE id=${req.params.id}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else if (results.length === 0) {
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
                    data: results.map(result => {
                        return {
                            ...result,
                            release_date: result.release_date.toISOString().split('T')[0]
                        }
                    })
                })
            }
        })
    })
}

const add = async (req, res) => {
    return new Promise((resolve, reject) => {
        const { title, genre, release_date, directed_by, duration, cast, synopsis, image } = req.body
        db.query(`INSERT INTO movie (title, genre, release_date, directed_by,duration,cast,synopsis,image) VALUES ('${title}', '${genre}', '${release_date}', '${directed_by}','${duration}','${cast}','${synopsis}','${image}')`, (err, results) => {
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
                    }
                })
            }
        });
    })
}

const update = async (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from movie where id=${req.params.id}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else if (results.length === 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Bad Request, data not found!',
                })
            } else {
                let prevData = {
                    ...results[0],
                    release_date: results[0].release_date.toISOString().split('T')[0],
                    ...req.body
                }
                if (req.body.image === '') {
                    prevData = {
                        ...prevData,
                        image: results[0].image
                    }
                }
                //delete image if change
                // console.log('first:', results[0].image, 'second:', req.body.image)
                if (req.body.image !== '' && !req.body.image) {
                    if (results[0].image !== req.body.image) {
                        fs.unlink(`uploads/${results[0].image}`, (err) => {
                            if (err) {
                                reject({
                                    success: false,
                                    status: 500,
                                    message: err,
                                })
                            }
                        })
                        prevData = {
                            ...prevData,
                            image: req.file.filename
                        }
                    }
                }

                const { title, genre, release_date, directed_by, duration, cast, synopsis, image } = prevData

                db.query(`UPDATE movie SET title='${title}', genre='${genre}', release_date='${release_date}', directed_by='${directed_by}',duration='${duration}',cast='${cast}',synopsis='${synopsis}',image='${image}' WHERE id=${req.params.id}`,
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
        db.query(`SELECT id,image from movie where id=${req.params.id}`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
                })
            } else if (results.length === 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Bad Request, data not found!',
                })
            } else {
                const imagetmp = results[0].image
                db.query(`DELETE FROM movie WHERE id=${req.params.id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: 'Error!',
                            data: err
                        })
                    } else {
                        fs.unlink(`uploads/${imagetmp}`, (err) => {
                            if (err) {
                                reject({
                                    success: false,
                                    status: 500,
                                    message: err,
                                })
                            }
                        })
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
    getById,
    add,
    update,
    remove
}
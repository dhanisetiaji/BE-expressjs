const db = require('../helpers/db')

const get = async (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM movie`, (err, results) => {
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
        db.query(`SELECT id from movie where id=${req.params.id}`, (err, results) => {
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
                db.query(`DELETE FROM movie WHERE id=${req.params.id}`, (err, results) => {
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

const search = async (req, res) => {
    return new Promise((resolve, reject) => {
        const { title } = req.body
        db.query(`SELECT * FROM movie WHERE title LIKE '%${title}%'`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: 'Error!',
                    data: {
                        code: err.code
                    }
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

const sort = async (req, res) => {
    return new Promise((resolve, reject) => {
        const { sort } = req.params
        const sortLower = sort.toLowerCase()
        let querysort = sortLower != 'asc' && sortLower != 'desc' ? 'asc' : sortLower
        db.query(`SELECT * FROM movie ORDER BY title ${querysort}, release_date ${querysort}`, (err, results) => {
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
                    sortBy: querysort,
                    message: 'successfully get data',
                    data: results.map(result => {
                        return {
                            ...result,
                            release_date: result.release_date.toISOString().split('T')[0]
                        }
                    })
                })
            }
        });
    })
}


module.exports = {
    get,
    getById,
    add,
    update,
    remove,
    search,
    sort
}
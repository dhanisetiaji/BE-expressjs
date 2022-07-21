const db = require('../helpers/db')
const fs = require('fs')
const CryptoJS = require("crypto-js");

const get = async (req, res) => {
    console.log(req.query)
    const { q } = req.query
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users ${q ? `WHERE firstName like '%${q}%' OR lastName like '%${q}%' OR phone like '%${q}%' OR email like '%${q}%' or role like '%${q}%'` : ''}`, (err, results) => {
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

const getById = async (req, res) => {
    const { id } = req.params
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id=${id}`, (err, results) => {
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

const updateAdmin = async (req, res) => {
    const { id } = req.params

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id=${id}`, (err, results) => {
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
                let prevData = {
                    ...results[0],
                    image: results[0].image,
                    ...req.body
                }
                if (req.body.image === '') {
                    prevData = {
                        ...prevData,
                        image: results[0].image
                    }
                }
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

                const { firstName, lastName, phone, email, role, image } = prevData
                db.query(`UPDATE users SET firstName='${firstName}', lastName='${lastName}', phone='${phone}', email='${email}', role='${role}', image='${image}' WHERE id=${id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: `Error!, ${err.code}`,
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully update data',
                            data: results
                        })
                    }
                })

            }
        })
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id=${id}`, (err, results) => {
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
                let prevData = {
                    ...results[0],
                    image: results[0].image,
                    ...req.body
                }
                if (req.body.image === '') {
                    prevData = {
                        ...prevData,
                        image: results[0].image
                    }
                }
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

                const { firstName, lastName, phone, email, role, image } = prevData
                db.query(`UPDATE users SET firstName='${firstName}', lastName='${lastName}', phone='${phone}', email='${email}', role='${role}', image='${image}' WHERE id=${id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: `Error!, ${err.code}`,
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully update data',
                            data: results
                        })
                    }
                })
            }

        })
    })
}

const updatePassword = async (req, res) => {
    const { id } = req.params

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id=${id}`, (err, results) => {
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
                const { password } = req.body
                const hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPT).toString()
                db.query(`UPDATE users SET password='${hash}' WHERE id=${id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: `Error!, ${err.code}`,
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully update password!',
                            data: results
                        })
                    }
                })

            }
        })
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id=${id}`, (err, results) => {
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
                const imgtmp = results[0].image
                db.query(`DELETE FROM users WHERE id=${id}`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: `Error!, ${err.code}`,
                        })
                    } else {
                        fs.unlink(`uploads/${imgtmp}`, (err) => {
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
                            data: results
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
    updateAdmin,
    updateUser,
    updatePassword,
    deleteUser
}


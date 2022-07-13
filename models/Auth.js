const db = require('../helpers/db')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')



const register = async (req, res) => {
    const { firstName, lastName, phone, email, password, code } = req.body
    return new Promise((resolve, reject) => {
        const hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPT).toString();
        db.query(`INSERT INTO users (firstName, lastName, phone, email, password, role, isVerify, code) VALUES ('${firstName}', '${lastName}', '${phone}', '${email}', '${hash}', 'User', 'N', '${code}')`, (err, results) => {

            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    reject({
                        success: false,
                        status: 400,
                        message: 'Email already exists, please login!',
                    })
                } else {
                    reject({
                        success: false,
                        status: 500,
                        message: err.sqlMessage,
                        data: {
                            errCode: err.code,
                            errNo: err.errno
                        }
                    })
                }
            } else {
                resolve({
                    success: true,
                    status: 200,
                    message: `Successfully Register, Check your email to verify your account!`,
                    data: {
                        id: results.insertId,
                    }
                })

            }
        })
    })
}

const verify = async (req, res) => {
    const { code, email } = req.query
    return new Promise((resolve, reject) => {
        db.query(`SELECT email,code FROM users WHERE email='${email}'`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: err.sqlMessage,
                    data: {
                        errCode: err.code,
                        errNo: err.errno
                    }
                })
            }
            if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Email not found!',
                })
            } else {
                if (results[0].code == code) {
                    db.query(`UPDATE users set isVerify='Y', code='' WHERE email='${email}'`, (err, results) => {
                        if (err) {
                            reject({
                                success: false,
                                status: 500,
                                message: err.sqlMessage,
                                data: {
                                    errCode: err.code,
                                    errNo: err.errno
                                }
                            })
                        } else {
                            resolve({
                                success: true,
                                status: 200,
                                message: 'Successfully verified!',
                            })
                        }
                    })
                } else {
                    reject({
                        success: false,
                        status: 400,
                        message: 'Wrong activation url!',
                    })
                }
            }

        })
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email='${email.toLowerCase()}'`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: err.sqlMessage,
                    data: {
                        errCode: err.code,
                        errNo: err.errno
                    }
                })
            } else {
                if (results.length == 0) {
                    reject({
                        success: false,
                        status: 400,
                        message: 'Email/Password not found!',
                    })
                } else {
                    const hash = CryptoJS.AES.decrypt(results[0].password, process.env.SECRET_KEY_CRYPT).toString(CryptoJS.enc.Utf8);
                    if (hash == password) {
                        const token = jwt.sign({
                            id: results[0].id,
                            email: results[0].email,
                            role: results[0].role,
                        }, process.env.SECRET_KEY_JWT, { expiresIn: process.env.JWT_EXPIRE })
                        resolve({
                            success: true,
                            status: 200,
                            message: 'Login successfully!',
                            data: {
                                id: results[0].id,
                                firstName: results[0].firstName,
                                token: token,
                            }
                        })
                    } else {
                        reject({
                            success: false,
                            status: 400,
                            message: 'Email/Password not found!',
                        })
                    }
                }
            }

        })
    })
}

const reSend = async (req, res) => {
    const { email, code } = req.body
    return new Promise((resolve, reject) => {
        db.query(`SELECT email,code,isVerify FROM users WHERE email='${email}'`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: err.sqlMessage,
                    data: {
                        errCode: err.code,
                        errNo: err.errno
                    }
                })
            }
            if (results[0].isVerify == 'Y') {
                reject({
                    success: false,
                    status: 400,
                    message: 'Your account already verified!',
                })
            }
            if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Email not found!',
                })
            } else {
                db.query(`UPDATE users set code='${code}' WHERE email='${email}'`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: err.sqlMessage,
                            data: {
                                errCode: err.code,
                                errNo: err.errno
                            }
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'Successfully re-sent!',
                        })
                    }
                })
            }

        })
    })
}

const forgotmail = async (req, res) => {
    const { email, code } = req.body
    return new Promise((resolve, reject) => {
        db.query(`SELECT email,code FROM users WHERE email='${email}'`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: err.sqlMessage,
                    data: {
                        errCode: err.code,
                        errNo: err.errno
                    }
                })
            }
            if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Email not found!',
                })
            } else {
                db.query(`UPDATE users set code='${code}' WHERE email='${email}'`, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: err.sqlMessage,
                            data: {
                                errCode: err.code,
                                errNo: err.errno
                            }
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'Successfully sent forgot-password!',
                        })
                    }
                })
            }

        })
    })
}

const changepassword = async (req, res) => {
    const { code, email } = req.query
    const { password } = req.body
    return new Promise((resolve, reject) => {
        const hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPT).toString();
        db.query(`SELECT email,code FROM users WHERE email='${email}'`, (err, results) => {
            if (err) {
                reject({
                    success: false,
                    status: 500,
                    message: err.sqlMessage,
                    data: {
                        errCode: err.code,
                        errNo: err.errno
                    }
                })
            }
            console.log(results.length)
            if (results.length == 0) {
                reject({
                    success: false,
                    status: 400,
                    message: 'Email not found!',
                })
            } else {
                if (results[0].code == code) {
                    db.query(`UPDATE users set isVerify='Y', code='', password='${hash}' WHERE email='${email}'`, (err, results) => {
                        if (err) {
                            reject({
                                success: false,
                                status: 500,
                                message: err.sqlMessage,
                                data: {
                                    errCode: err.code,
                                    errNo: err.errno
                                }
                            })
                        } else {
                            resolve({
                                success: true,
                                status: 200,
                                message: 'Successfully change password!',
                            })
                        }
                    })
                } else {
                    reject({
                        success: false,
                        status: 400,
                        message: 'Wrong activation url!',
                    })
                }
            }

        })
    })
}

module.exports = {
    register,
    verify,
    login,
    reSend,
    forgotmail,
    changepassword
}
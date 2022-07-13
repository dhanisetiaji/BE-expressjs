const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'undefined') {
        return res.status(401).send({ message: "Unauthorized User, Token Required" })
    } else {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY_JWT, function (err, decoded) {
            if (err) {
                return res.status(403).send({ message: "Access Forbidden" })
            }
            if (decoded.role === 'Admin') {
                next()
            } else {
                return res.status(403).send({ message: "Access Forbidden" })
            }
        });
    }
}

const isUser = async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'undefined') {
        return res.status(401).send({ message: "Unauthorized User, Token Required" })
    } else {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY_JWT, function (err, decoded) {
            if (err) {
                return res.status(403).send({ message: "Access Forbidden" })
            }
            if (decoded.role === 'User') {
                next()
            } else {
                return res.status(403).send({ message: "Access Forbidden" })
            }
        });
    }
}

module.exports = {
    isAdmin,
    isUser
}
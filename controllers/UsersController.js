const users = require('../models/Users')


const getUsers = async (req, res) => {
    try {
        const result = await users.get(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

const getByIdUsers = async (req, res) => {
    try {
        const result = await users.getById(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

const updatebyAdminUser = async (req, res) => {
    try {
        let reqModified = {
            ...req,
        }
        if (req.file) {
            if (req.file !== null && req.file !== '') {
                reqModified = {
                    ...req,
                    body: { ...req.body, image: req.file.filename }
                }
            }
        }
        const result = await users.updateAdmin(reqModified, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        let reqModified = {
            ...req,
        }
        if (req.file) {
            if (req.file !== null && req.file !== '') {
                reqModified = {
                    ...req,
                    body: { ...req.body, image: req.file.filename }
                }
            }
        }
        const result = await users.updateUser(reqModified, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

const updatePasswordUser = async (req, res) => {
    try {
        const result = await users.updatePassword(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await users.deleteUser(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

module.exports = {
    deleteUser,
    updatePasswordUser,
    updateUser,
    updatebyAdminUser,
    getByIdUsers,
    getUsers
}
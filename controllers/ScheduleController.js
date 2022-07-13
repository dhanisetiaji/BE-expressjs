const schedules = require('../models/Schedule')

// const getSchedule = async (req, res) => {
//     try {
//         const result = await schedules.get()
//         return res.status(200).json(result)
//     } catch (error) {
//         return res.status(500).json(error)
//     }

// }

const getSchedule = async (req, res) => {
    try {
        const result = await schedules.get(req, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const addSchedule = async (req, res) => {
    try {
        const result = await schedules.add(req, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateSchedule = async (req, res) => {
    try {
        const result = await schedules.update(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}

const removeSchedule = async (req, res) => {
    try {
        const result = await schedules.remove(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}

module.exports = {
    getSchedule,
    addSchedule,
    updateSchedule,
    removeSchedule
}
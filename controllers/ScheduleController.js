const schedules = require('../models/Schedule')

// const getSchedule = async (req, res) => {
//     try {
//         const result = await schedules.get()
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json(error)
//     }

// }

const getSchedule = async (req, res) => {
    try {
        const result = await schedules.get()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addSchedule = async (req, res) => {
    try {
        const result = await schedules.add(req, res)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateSchedule = async (req, res) => {
    try {
        const result = await schedules.update(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const removeSchedule = async (req, res) => {
    try {
        const result = await schedules.remove(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.code === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

module.exports = {
    getSchedule,
    addSchedule,
    updateSchedule,
    removeSchedule
}
const cinemas = require('../models/Cinema')


const getCinema = async (req, res) => {
    try {
        const result = await cinemas.get(req, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const addCinema = async (req, res) => {
    try {
        const result = await cinemas.add(req, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    getCinema,
    addCinema
}
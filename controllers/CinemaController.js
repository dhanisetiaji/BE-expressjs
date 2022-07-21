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
        const reqModified = {
            ...req,
            body: { ...req.body, image_cinema: req.file.filename }
        }
        const result = await cinemas.add(reqModified, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateCinema = async (req, res) => {
    try {
        let reqModified = {
            ...req,
        }
        if (req.file) {
            if (req.file !== null && req.file !== '') {
                reqModified = {
                    ...req,
                    body: { ...req.body, image_cinema: req.file.filename }
                }
            }
        }
        const result = await cinemas.update(reqModified, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error)
        }
        // console.log(error)
        return res.status(500).json(error)
    }
}

const deleteCinema = async (req, res) => {
    try {
        const result = await cinemas.remove(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error)
        }
        return res.status(500).json(error)
    }
}

module.exports = {
    getCinema,
    addCinema,
    updateCinema,
    deleteCinema
}
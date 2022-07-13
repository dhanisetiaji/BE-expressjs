const Movie = require('../models/Movie')

const getMovie = async (req, res) => {
    try {
        const result = await Movie.get(req, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getMovieById = async (req, res) => {
    try {
        const result = await Movie.getById(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}

const addMovie = async (req, res) => {
    try {
        const reqModified = {
            ...req,
            body: { ...req.body, image: req.file.filename }
        }
        const result = await Movie.add(reqModified, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateMovie = async (req, res) => {
    try {
        let reqModified = {
            ...req,
        }
        if (req.file) {
            reqModified = {
                ...req,
                body: { ...req.body, image: req.file.filename }
            }
        }
        const result = await Movie.update(reqModified, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status == 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}

const removeMovie = async (req, res) => {
    try {
        const result = await Movie.remove(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status == 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}



module.exports = {
    getMovie,
    getMovieById,
    addMovie,
    updateMovie,
    removeMovie,
}
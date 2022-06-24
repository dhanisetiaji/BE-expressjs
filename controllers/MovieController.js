const Movie = require('../models/Movie')

const getMovie = async (req, res) => {
    try {
        const result = await Movie.get(req, res)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getMovieById = async (req, res) => {
    try {
        const result = await Movie.getById(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const addMovie = async (req, res) => {
    try {
        const result = await Movie.add(req, res)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateMovie = async (req, res) => {
    try {
        const result = await Movie.update(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.status == 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const removeMovie = async (req, res) => {
    try {
        const result = await Movie.remove(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.status == 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const searchMovie = async (req, res) => {
    try {
        const result = await Movie.search(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.status == 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const sortMovie = async (req, res) => {
    try {
        const result = await Movie.sort(req, res)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getMovie,
    getMovieById,
    addMovie,
    updateMovie,
    removeMovie,
    searchMovie,
    sortMovie
}
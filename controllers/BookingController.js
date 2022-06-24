const Booking = require('../models/Booking')

const getBooking = async (req, res) => {
    try {
        const result = await Booking.get()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addBooking = async (req, res) => {
    try {
        const result = await Booking.add(req, res)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateBooking = async (req, res) => {
    try {
        const result = await Booking.update(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const removeBooking = async (req, res) => {
    try {
        const result = await Booking.remove(req, res)
        res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

module.exports = {
    getBooking,
    addBooking,
    updateBooking,
    removeBooking
}
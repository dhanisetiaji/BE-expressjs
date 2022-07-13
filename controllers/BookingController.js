const Booking = require('../models/Booking')

const getBooking = async (req, res) => {
    try {
        const result = await Booking.get()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const addBooking = async (req, res) => {
    try {
        const result = await Booking.add(req, res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateBooking = async (req, res) => {
    try {
        const result = await Booking.update(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}

const removeBooking = async (req, res) => {
    try {
        const result = await Booking.remove(req, res)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error)
        } else {
            return res.status(500).json(error)
        }
    }
}

module.exports = {
    getBooking,
    addBooking,
    updateBooking,
    removeBooking
}
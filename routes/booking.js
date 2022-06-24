const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/BookingController')

router.get('/', bookingController.getBooking)
router.post('/', bookingController.addBooking)
router.patch('/:id', bookingController.updateBooking)
router.delete('/:id', bookingController.removeBooking)

module.exports = router
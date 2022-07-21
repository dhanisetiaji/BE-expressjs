const express = require('express')
const router = express.Router()
const { getCinema, addCinema, updateCinema, deleteCinema } = require('../controllers/CinemaController')
const { isAdmin } = require('../middlewares/Auth')
const upload = require('../helpers/cinemaUpload')

router.get('/', getCinema)
router.post('/', isAdmin, upload, addCinema)
router.patch('/:id', isAdmin, upload, updateCinema)
router.delete('/:id', isAdmin, deleteCinema)


module.exports = router
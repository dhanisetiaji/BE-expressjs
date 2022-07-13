const express = require('express')
const router = express.Router()
const moviecontroller = require('../controllers/MovieController')
const upload = require('../helpers/multer')
const { isAdmin, isUser } = require('../middlewares/Auth')

router.get('/', moviecontroller.getMovie)
router.get('/:id', moviecontroller.getMovieById)
router.post('/', isAdmin, upload, moviecontroller.addMovie)
router.patch('/:id', isAdmin, upload, moviecontroller.updateMovie)
router.delete('/:id', isAdmin, moviecontroller.removeMovie)

module.exports = router
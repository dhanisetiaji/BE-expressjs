const express = require('express')
const router = express.Router()
const moviecontroller = require('../controllers/MovieController')

router.get('/', moviecontroller.getMovie)
router.get('/:id', moviecontroller.getMovieById)
router.post('/', moviecontroller.addMovie)
router.patch('/:id', moviecontroller.updateMovie)
router.delete('/:id', moviecontroller.removeMovie)
router.post('/search', moviecontroller.searchMovie)
router.get('/sort/:sort', moviecontroller.sortMovie)

module.exports = router
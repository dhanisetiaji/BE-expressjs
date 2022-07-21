const userController = require('../controllers/UsersController');
const express = require('express')
const router = express.Router()
const upload = require('../helpers/multer')
const { isAdmin, isUser, isAllowed } = require('../middlewares/Auth')

router.get('/', isAdmin, userController.getUsers)
router.get('/:id', isAllowed, userController.getByIdUsers)
router.patch('/', isAdmin, upload, userController.updatebyAdminUser)
router.patch('/update', isUser, upload, userController.updateUser)
router.patch('/update-password/:id', isUser, userController.updatePasswordUser)
router.delete('/:id', isAdmin, userController.deleteUser)

module.exports = router
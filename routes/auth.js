const express = require('express')
const { registerUser, loginUser, verifyUser, resendEmail, forgotMail, changePassword, refreshTokenAuth, verifyTokenAuth } = require('../controllers/AuthController')
const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/resend-email', resendEmail)
router.get('/verify-email', verifyUser)
router.post('/forgot-password', forgotMail)
router.post('/change-password', changePassword)
router.post('/refresh-token', refreshTokenAuth)
router.post('/verify-token', verifyTokenAuth)

module.exports = router
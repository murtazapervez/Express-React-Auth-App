const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {
    registerUser,
    login,
    getUserData,
} = require('../controllers/UserController')

router.post('/register', registerUser)
router.post('/login', login)
router.get('/me', protect ,getUserData)

module.exports = router
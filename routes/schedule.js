const express = require('express')
const router = express.Router()
const schedulescontroller = require('../controllers/ScheduleController')
const { isAdmin, isUser, isAllowed } = require('../middlewares/Auth')

router.get('/', schedulescontroller.getSchedule)
router.get('/:id', schedulescontroller.getScheduleByIdMovie)
router.post('/', isAdmin, schedulescontroller.addSchedule)
router.patch('/:id', isAdmin, schedulescontroller.updateSchedule)
router.delete('/:id', isAdmin, schedulescontroller.removeSchedule)

module.exports = router
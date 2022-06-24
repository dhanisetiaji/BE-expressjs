const express = require('express')
const router = express.Router()
const schedulescontroller = require('../controllers/ScheduleController')

router.get('/', schedulescontroller.getSchedule)
router.post('/', schedulescontroller.addSchedule)
router.patch('/:id', schedulescontroller.updateSchedule)
router.delete('/:id', schedulescontroller.removeSchedule)

module.exports = router
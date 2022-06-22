const express = require('express')
const router = express.Router()
const db = require('../../configs/db')

router.get('/', async (req, res) => {
    db.query('SELECT * FROM schedules', (err, results) => {
        if (err) {
            res.send({
                success: false,
                message: 'Error!',
                data: err
            }).status(500)
        } else {
            res.send({
                success: true,
                message: 'successfully get data',
                data: results
            }).status(200)
        }
    })
})

router.post('/', async (req, res) => {
    const { id_movie, id_cinema, time, price } = req.body
    db.query(`INSERT INTO schedules (id_movie,id_cinema,time,price) VALUES ('${id_movie}','${id_cinema}','${time}','${price}')`, (err, results) => {
        if (err) {
            res.send({
                success: false,
                message: 'Error!',
                data: err
            }).status(500)
        } else {
            res.send({
                success: true,
                message: 'successfully add data',
            }).status(200)
        }
    })
})

router.patch('/:id', async (req, res) => {
    db.query(`SELECT * from schedules where id=${req.params.id}`, (err, results) => {
        if (err) {
            res.send({
                success: false,
                message: 'Error!',
                data: err
            }).status(500)
        } else if (results.length === 0) {
            res.send({
                success: false,
                message: 'data not found',
            }).status(404)
        } else {
            let prevData = {
                ...results[0],
                ...req.body
            }
            db.query(`UPDATE schedules SET id_movie='${prevData.id_movie}',id_cinema='${prevData.id_cinema}',time='${prevData.time}',price='${prevData.price}' WHERE id=${req.params.id}`, (err, results) => {
                if (err) {
                    res.send({
                        success: false,
                        message: 'Error!',
                        data: err
                    }).status(500)
                } else {
                    res.send({
                        success: true,
                        message: 'successfully update data',
                    }).status(200)
                }
            })

        }
    })

})

router.delete('/:id', async (req, res) => {
    db.query(`DELETE FROM schedules WHERE id=${req.params.id}`, (err, results) => {
        if (err) {
            res.send({
                success: false,
                message: 'Error!',
                data: err
            }).status(500)
        } else {
            res.send({
                success: true,
                message: 'successfully delete data',
            }).status(200)
        }
    })
})

module.exports = router
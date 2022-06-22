const express = require('express')
const router = express.Router()
const db = require('../../configs/db')


router.get('/', async (req, res) => {
    db.query('SELECT * FROM movie', (err, results) => {
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
    });
});

router.post('/', async (req, res) => {
    const { title, genre, release_date, directed_by, duration, cast, synopsis, image } = req.body
    db.query(`INSERT INTO movie (title, genre, release_date, directed_by,duration,cast,synopsis,image) VALUES ('${title}', '${genre}', '${release_date}', '${directed_by}','${duration}','${cast}','${synopsis}','${image}')`, (err, results) => {
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
    });
});

router.patch('/:id', async (req, res) => {
    db.query(`SELECT * from movie where id=${req.params.id}`, (err, results) => {
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
                release_date: results[0].release_date.toISOString().split('T')[0],
                ...req.body
            }
            const { title, genre, release_date, directed_by, duration, cast, synopsis, image } = prevData

            db.query(`UPDATE movie SET title='${title}', genre='${genre}', release_date='${release_date}', directed_by='${directed_by}',duration='${duration}',cast='${cast}',synopsis='${synopsis}',image='${image}' WHERE id=${req.params.id}`,
                (err, results) => {
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
    db.query(`SELECT id from movie where id=${req.params.id}`, (err, results) => {
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
            }).status(400)
        } else {
            db.query(`DELETE FROM movie WHERE id=${req.params.id}`, (err, results) => {
                if (err) {
                    res.send({
                        success: false,
                        message: 'Error!',
                    }).status(500)
                } else {
                    res.send({
                        success: true,
                        message: 'successfully delete data',
                    }).status(200)
                }
            })
        }

    })
})

router.post('/search', async (req, res) => {
    const { title } = req.body
    db.query(`SELECT * FROM movie WHERE title LIKE '%${title}%'`, (err, results) => {
        if (err) {
            res.send({
                success: false,
                message: 'Error!',
                data: err
            }).status(500)
        } if (results.length == 0) {
            res.send({
                success: false,
                message: 'data not found',
            }).status(204)
        } else {
            res.send({
                success: true,
                message: 'successfully get data',
                data: results
            }).status(200)
        }
    })
})

router.get('/:sort', async (req, res) => {
    const { sort } = req.params
    const sortLower = sort.toLowerCase()
    let querysort = sortLower != 'asc' && sortLower != 'desc' ? 'asc' : sortLower
    db.query(`SELECT * FROM movie ORDER BY title ${querysort}, release_date ${querysort}`, (err, results) => {
        if (err) {
            res.send({
                success: false,
                message: 'Error!',
                data: err
            }).status(500)
        } else {
            res.send({
                success: true,
                sortBy: querysort,
                message: 'successfully get data',
                data: results
            }).status(200)
        }
    });
})


module.exports = router
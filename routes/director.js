const express = require('express');
const router = express.Router();
const Director = require('../models/Director');


/* GET users listing. */
router.get('/', (req, res, next) => {
    const promise = Director.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/', (req, res, next) => {

    const director = new Director(req.body);

    const promise = director.save();

    promise.then((data) => {
        res.json({
            status: 'Başarılı Kayıt',
            Object: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:movie_id', (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((movie) => {
        if (!movie)
            next({message: 'The movie was not found!', code: 88});
        res.json(movie)
    }).catch((err) => {
        res.json(err);
    });
})

router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );
    promise.then((movie) => {
        if (!movie)
            next({message: 'The movie was not found!', code: 88});

        res.json(movie)
    }).catch((err) => {
        res.json(err);
    });
})

router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        if (!movie)
            next({message: 'The movie was not found!', code: 88});

        res.json({status: 'Sime işlemi başarılı'})
    }).catch((err) => {
        res.json(err);
    });
});

//Get Top 10 List
router.get('/top/10', (req, res, next) => {
    const promise = Movie.find({})
        .limit(10)
        .sort({
            imdb_score: -1
        });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//Between start date and end date
router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;
    const promise = Movie.find(
        {
            year: {
                '$gte': parseInt(start_year),
                '$lte': parseInt(end_year)
            }
        });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;

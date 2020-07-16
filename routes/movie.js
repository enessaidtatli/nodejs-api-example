const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    status: 1
  })
});

router.post('/', (req, res, next) => {

  const movie = new Movie(req.body);
 /* const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  })*/

/*  movie.save((err, data) => {
    if(err)
      res.json(err);

    res.json({status: 'Kayıt Başarılı'});
  })*/

  const promise = movie.save();
  promise.then((data) => {
    res.json({status: 'Başarılı Kayıt'});
  }).catch((err) =>{
    res.json(err);
  });

});


module.exports = router;

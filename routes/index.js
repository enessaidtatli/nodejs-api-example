const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    const user = new User();
    user.username = username;
    bcrypt.hash(password, 10, function (err, hash) {
        user.password = hash;
        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })
    });
});

router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username}, (err, user) => {
        if (err)
            throw err;

        if (!user) {
            res.json({
                status: false,
                message: 'Authentication failed, user not found.'
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {
                if (!result){
                    res.json({
                        status: false,
                        message: 'Authentication failed, wrong password.'
                    });
                } else{
                    const payload = {
                        username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), { expiresIn: 720 });
                    res.json({
                        status: true,
                        token
                    });
                }
            })
        }
    });
});


module.exports = router;

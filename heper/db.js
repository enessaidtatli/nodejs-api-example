const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie-user:movieuser1234@ds155294.mlab.com:55294/heroku_t9jnd321');
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });


    mongoose.Promise = global.Promise;
}
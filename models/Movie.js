const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, '{PATH} alanı zounludur'],
        maxlength: [15, "{PATH} alanı ({VALUE}), {MAXLENGTH} karakterden küçük olmalıdır"],
        minlength: [2, "{PATH} alanı ({VALUE}), {MINLENGTH} karakterden büyük olmalıdır"],
    },
    category: {
        type: String,
        maxlength: [30, "{PATH} alanı ({VALUE}), {MAXLENGTH} karakterden küçük olmalıdır"],
        minlength: [1, "{PATH} alanı ({VALUE}), {MINLENGTH} karakterden büyük olmalıdır"],
    },
    country: {
        type: String,
        maxlength: [30, "{PATH} alanı ({VALUE}), {MAXLENGTH} karakterden küçük olmalıdır"],
        minlength: [1, "{PATH} alanı ({VALUE}), {MINLENGTH} karakterden büyük olmalıdır"],
    },
    year: {
        type: Number,
        max: 2040,
        min: 1950
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 1
    },
    director_id: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('movies', MovieSchema);
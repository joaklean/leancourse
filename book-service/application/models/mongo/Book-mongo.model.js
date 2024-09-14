const mongoose = require('../../../config/db');
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Book', bookSchema);

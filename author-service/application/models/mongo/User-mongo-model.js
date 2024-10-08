const mongoose = require('../../../config/db');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
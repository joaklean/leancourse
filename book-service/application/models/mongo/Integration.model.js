const mongoose = require('../../../config/db');
const integrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    token: { type: String, required: true },
});

module.exports = mongoose.model('Integration', integrationSchema);
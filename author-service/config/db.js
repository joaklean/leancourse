const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error(err));

module.exports = mongoose;

require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authorRoutes =  require('./routes/authorRoutes');
const bookRoutes =  require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/api', authorRoutes);
app.use('/api', bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

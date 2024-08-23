require('dotenv').config();
const express = require('express');
const userRoutes = require('./application/routes/userRoutes');
const authorRoutes =  require('./application/routes/authorRoutes');
const bookRoutes =  require('./application/routes/bookRoutes');

const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/api', authorRoutes);
app.use('/api', bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/user', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

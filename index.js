require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/api', authorRoutes);
app.use('/api', bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const connectDB = require('./config/connection');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const channelCardRoutes = require('./routes/channelCardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/categories/:categoryId/card', channelCardRoutes);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});
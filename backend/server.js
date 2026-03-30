const connectDB = require('./config/connection');

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const channelCardRoutes = require('./routes/channelCardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/auth', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/categories/card', channelCardRoutes);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});
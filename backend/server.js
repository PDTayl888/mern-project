const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/connection');


require('dotenv').config();

const app = express();
require('./config/passport');

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use(express.json());

app.use(passport.initialize());

const userRoutes = require('./routes/userRoutes');
const channelCardRoutes = require('./routes/channelCardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/categories/:categoryId/card', channelCardRoutes);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});
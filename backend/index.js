
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const trailRoutes = require('./routes/trailRoutes');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/trails', trailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/favorite', favoriteRoutes);



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
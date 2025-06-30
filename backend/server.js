
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const trailRoutes = require('./routes/trailRoutes');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/favoriteRoutes');
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();

app.use(cors(
    {origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/trails', trailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port... ${PORT}`);
});

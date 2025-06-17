
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const trailRoutes = require('./routes/trailRoutes');
const userRoutes = require('./routes/userRoutes');



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/trails', trailRoutes);
app.use('/api/users', userRoutes);


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
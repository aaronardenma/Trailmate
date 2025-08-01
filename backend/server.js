const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const trailRoutes = require('./routes/trailRoutes');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const gearRoutes = require('./routes/gearRoutes');
const hazardRoutes = require('./routes/hazardRoutes');
const tagRoutes = require('./routes/tagRoutes');
const Trip = require('./models/trips');

// Initialize dotenv and load environment variables
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

// Initialize Express app
const app = express();

// Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Static assets (e.g., CSS, JS)

// Initialize cookie parser and middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json()); // To parse incoming JSON requests

// Setup CORS for frontend access
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// Setup Routes
app.use('/api/trails', trailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/hazards', hazardRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/gear', gearRoutes);
app.use('/api/tags', tagRoutes);

// app.get("/api/trips/byid/:id", async (req, res) => {
//     const trip = await Trip.findOne({ _id: req.params.id });
//     res.json({ trip });
// });

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`MongoDB connected to ${process.env.MONGO_URI}`))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("send-location", (data) => {
        console.log(`Received from ${socket.id}:`, data);
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log(" A user disconnected:", socket.id);
        io.emit("user-disconnected", socket.id);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

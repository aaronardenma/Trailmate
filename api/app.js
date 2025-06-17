const express = require('express')
const cors = require('cors');
const app = express()
const { getAllTrails } = require('./service/trails');
const PORT = 8080

let postRoutes = express.Router();


app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})


app.get('/ping', (req, res) => {
    res.send('pong')
})

const mongoose = require("mongoose");

const dbURI = 'mongodb://localhost/Trailmate';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});

app.get('/trails', async (req, res) => {

    try {
        const trails = await getAllTails();
        return res.status(200).json({ message: "Trail found successfully", trails });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching trails ", error: error.message });
    }
});


// setting up routes

/**
 * HTTP GET /api/trails
 * HTTP GET /api/trails/{id}
 * HTTP GET /api/trails/{userId}/favorites
 *
 * HTTP GET /users/{id}
 * HTTP POST /users
 * HTTP PUT /users/{id}
 * HTTP DELETE /users/{id}
 *
 *
 */
// app.use(postRoutes);

//
// postRoutes.route("/api/trails").get((req, res) => {
//     // get all trails from db
// })


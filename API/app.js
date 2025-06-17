const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 8080

let postRoutes = express.Router();

// setting up server

app.use(cors());
app.use(express.json()); // parse all requests in JSON

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

app.get('/ping', (req, res) => {
    res.send('pong')
})

// Setting up DB
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

postRoutes.route("/api/trails").get((req, res) => {
    // get all trails from db
})


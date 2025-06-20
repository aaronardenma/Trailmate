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
    res.send('pong13')
})

// Setting up DB
const mongoose = require("mongoose");

// const dbURI = 'mongodb://localhost/Trailmate';

const dbURI = 'mongodb://host.docker.internal:27017/Trailmate/'

mongoose
    .connect(dbURI)
    .then(() => {
        console.log('connected to DB...')
        app.listen(PORT, () => {
            console.log(`Listening for connections on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })




mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});

postRoutes = require("./routes")
app.use('/', postRoutes)
// postRoutes = require("./Routes/BookRoutes")





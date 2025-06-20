const express = require("express");
const Users = require("./model/Users");

let postRoutes = express.Router();


postRoutes.route("/users").get(async (request, response) => {
    let users = []
    try {
        users = await Users.find().exec()
    } catch (error) {
        console.log("oops: " + error)
    }
    response.send(users)
})

module.exports = postRoutes

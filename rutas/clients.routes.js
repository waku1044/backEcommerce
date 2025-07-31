const express = require("express");
const route = express.Router();
const registro = require('../controllers/clients.controllers.js');
const login = require('../controllers/clients.controllers.js');

route.post("/register", registro);
route.post("/login",login);


module.exports = route;
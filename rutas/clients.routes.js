import express from "express";
import  registro from '../controllers/clients.controllers.js';
import login from '../controllers/clients.controllers.js';
const route = express.Router();

route.post("/register", registro);
route.post("/login",login);


module.exports = route;
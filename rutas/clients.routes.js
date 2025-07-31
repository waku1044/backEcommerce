import express from "express";
import  {registro, login}  from '../controllers/clients.controllers.js';

const route = express.Router();

route.post("/register", registro);
route.post("/login",login);


export default route;
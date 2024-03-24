const express = require("express");
const router = express.Router();

const {contactUs} = require("../controllers/ContactUs");

// setting routes

router.get("/contact", contactUs)
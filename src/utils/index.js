const User = require('./User');
const express = require('express');
const router = express.Router();

router.get('/', function(_req, res) {
    res.send("Welcome to Costco Roscoe's Liquor & Gas™")
})

module.exports = { User, router };
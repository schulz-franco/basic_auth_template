'use strict'

const express = require('express');
const User = require('../controllers/user');

let router = express.Router();

router.post('/auth', User.auth);
router.post('/new', User.new);

module.exports = router;

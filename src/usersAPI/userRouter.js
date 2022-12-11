'use strict';

const express = require('express');
const { usersController } = require('./usersController');
const cookiesParser = require('cookie-parser');

const router = express.Router();
const users = new usersController();

router.use(cookiesParser(process.env.COOKIE_SECRET_KEY));

router.post('/singup', users.singUp);

router.post('/login', users.login);

router.get('/logout', users.logout);

router.get('/activate/:token', users.activate);

module.exports = router;

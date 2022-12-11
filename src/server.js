'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv/config');
const ordersRouter = require('./ordersAPI/ordersRouter');
const phonesRouter = require('./phonesAPI/phonesRouter');
const usersRouter = require('./usersAPI/userRouter');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: [process.env.CLIENT_DEV_URL, process.env.CLIENT_PROD_URL],
    credentials: true,
}));
app.use(express.json());
app.use(router);

// Home page
router.get('/', (request, response) => {
    try {
        response.send(
          'Welcome to Nice-Gadgets Back-End SERVER!'
          + '<hr><br /> Visit us here - https://fe-aug22-team-harold.github.io/nice_gadgets_FE'
        );
    } catch (e) {
        response.sendStatus(500);
    }
});

// Products/phones
app.use('/products', phonesRouter);

// Order:
app.use('/orders', ordersRouter);

// Auth/Login/Register users:
app.use('/users', usersRouter)

// server init
app.listen(PORT, () => {
    console.log(`running on - http://localhost:${PORT}`);
});

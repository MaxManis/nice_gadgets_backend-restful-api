'use strict';

const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv/config');
const { phonesController } = require("./phonesAPI/phonesController");
const { usersController } = require("./usersAPI/usersController");
const { ordersController } = require("./ordersAPI/ordersController");

const app = express();
const router = express.Router();
const phones = new phonesController();
const users = new usersController();
const orders = new ordersController();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: [process.env.CLIENT_DEV_URL, process.env.CLIENT_PROD_URL],
}));
app.use(express.json());
app.use(router);

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

router.get('/products', phones.getAllPhones);

router.get('/products/:phoneid', phones.getOnePhone);

router.get('/products/one/:phoneSlug', phones.getOnePhoneBySlug);

router.get('/products/same/:phoneSlug', phones.getSamePhonesBySlug);

router.post('/products', phones.getOnePhone);

router.patch('/products/:phoneid', phones.getOnePhone);

router.delete('/products/:phoneid', phones.getOnePhone);

// ==================
// Order:
router.post('/orders', orders.createOrder);

router.get('/orders', orders.getAllOrders);

router.get('/orders/:userid', orders.getOrdersByUser);

// ==================
// Auth/Login/Register:
router.post('/users/singup', users.singUp);

router.post('/users/login', users.login);

router.get('/users/logout', users.logout);

router.get('/users/activate/:token', users.activate);

// =================

// app.use('/.netlify/functions/server', router);
// module.exports.handler = serverless(app);

app.listen(PORT, () => {
    console.log(`running on - http://localhost:${PORT}`);
});

// http://localhost:9000/.netlify/functions/server

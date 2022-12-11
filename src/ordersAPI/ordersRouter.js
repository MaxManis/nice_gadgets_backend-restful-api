'use strict';

const express = require('express');
const { ordersController } = require('./ordersController');

const router = express.Router();
const orders = new ordersController();

router.post('/', orders.createOrder);

router.get('/', orders.getAllOrders);

router.get('/:userid', orders.getOrdersByUser);

module.exports = router;

'use strict';

const { Orders } = require("../models/orders");
const { sendUserOrderDetails } = require('../services/emailService');
const userServices = require("../usersAPI/usersServices");
require('dotenv/config');

class ordersController {
  async createOrder(request, response) {
    try {
      const { userid, useremail, orderList, total, note } = request.body;
      const currentUser = await userServices.getByEmail(useremail);

      if (!userid || !useremail || !orderList
          || !orderList.length|| !total || !currentUser
        ) {
        response.statusCode = 401;
        response.send({ error: 'invalid data'});

        return;
      }

      const newOrder = await Orders.create({
        userid,
        useremail,
        orderList,
        total,
        note,
      });
      await sendUserOrderDetails(useremail, orderList.length, total);

      response.statusCode = 201;
      response.send(newOrder);
    } catch (e) {
      response.sendStatus(500);
    }
  }

  async getAllOrders(request, response) {
    try {
      const allOrders = await Orders.findAll({});

      response.sendStatus = 200;
      response.send(allOrders);
    } catch (e) {
      response.sendStatus(500);
    }
  }

  async getOrdersByUser(request, response) {
    try {
      const { userid } = request.params;
      const userOrders = await Orders.findAll({
        where: {
          userid: +userid,
        },
      });

      response.sendStatus = 200;
      response.send(userOrders);
    } catch (e) {
      response.sendStatus(500);
    }
  }
}

module.exports = {
  ordersController,
}

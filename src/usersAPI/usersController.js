'use strict';

const { Users } = require("../models/users");
const userServices = require("./usersServices");
const jwtService = require("../services/jwtService");
const { sendUserActivationLink } = require('../services/emailService');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
require('dotenv/config');

class usersController {
  async singUp(request, response) {
    try {
      const { name, email, password } = request.body;

      if (await userServices.getByEmail(email)) {
        response.statusCode = 409;
        response.send({ error: 'User with this email already exist' });

        return;
      }

      const hash = await bcrypt.hash(password, 10);
      const activationToken = uuidv4();
      const newUser = await Users.create({
        name,
        email,
        password: hash,
        activationToken,
      });

      await sendUserActivationLink(email, activationToken);

      response.statusCode = 201;
      response.send(newUser);
    } catch (e) {
      response.sendStatus(500);
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;
      const currentUser = await userServices.getByEmail(email);
      const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

      if (!currentUser) {
        response.statusCode = 401;
        response.send({ error: 'Wrong email' });

        return;
      }

      if (!isPasswordCorrect) {
        response.statusCode = 401;
        response.send({ error: 'Wrong password' });

        return;
      }

      const userData = userServices.normalize(currentUser);
      const accessToken = jwtService.generateAccessToken(userData);

      response.cookie('token', accessToken, {
        sameSite: 'none',
        secure: true,
      });

      response.statusCode = 200;
      response.send(userData);
    } catch (e) {
      response.sendStatus(500);
    }
  }

  async activate(request, response) {
    try {
      const { token } = request.params;
      const currentUser = await Users.findOne({
        where: {
          activationToken: token,
        }
      });

      if (!currentUser) {
        response.statusCode = 404;
        response.send({error: 'Incorrect activation token!'});
      }

      currentUser.set({
        activationToken: null,
      });
      await currentUser.save();

      response.statusCode = 200;
      response.send(currentUser);
    } catch (e) {
      response.sendStatus(500);
    }
  }

  async logout(request, response) {
    try {
      response.clearCookie('token');
      response.statusCode = 200;
      response.send({ logout: 'done' });
    } catch (e) {
      response.sendStatus(500);
    }
  }
}

module.exports = {
  usersController,
}

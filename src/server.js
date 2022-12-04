'use strict';

const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv/config');
const { phonesController } = require("./phonesAPI/phonesController");

const app = express();
const router = express.Router();
const controller = new phonesController();
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
          + '\n visit us here - https://fe-aug22-team-harold.github.io/nice_gadgets_FE'
        );
    } catch (e) {
        response.sendStatus(500);
    }
});

router.get('/products', controller.getAllPhones);

router.get('/products/:phoneid', controller.getOnePhone);

router.get('/products/one/:phoneSlug', controller.getOnePhoneBySlug);

router.post('/products', controller.getOnePhone);

router.patch('/products/:phoneid', controller.getOnePhone);

router.delete('/products/:phoneid', controller.getOnePhone);

// app.use('/.netlify/functions/server', router);
// module.exports.handler = serverless(app);

app.listen(PORT, () => {
    console.log(`running on - http://localhost:${PORT}`);
});

// http://localhost:9000/.netlify/functions/server
// http://localhost:9000/.netlify/functions/server/products-create

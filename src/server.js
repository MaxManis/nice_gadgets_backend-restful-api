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

app.use(cors());
app.use(express.json());
app.use(router);

router.get('/', (request, response) => {
    try {
        response.send('Hello from Nice Gadgets Back-End SERVER!');
    } catch (e) {
        response.sendStatus(500);
    }
});

router.get('/products', controller.getAllPhones);

router.get('/products/:phoneid', controller.getOnePhone);

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
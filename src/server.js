const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const { phones } = require('./phones');
require('dotenv/config');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

router.get('/', (request, response) => {
    try {
        response.send('Hello from Nice Gadgets Back-End SERVER!');
    } catch (e) {
        response.sendStatus(500);
    }
});

router.get('/goods', (request, response) => {
    try {
        response.statusCode = 200;
        response.json(phones);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sl = require('serverless-http');
require('dotenv/config');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    try {
        response.send('Hello from Nice Gadgets Back-End SERVER!');
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/goods', (request, response) => {
    try {
        const phonesPath = path.join(__dirname, 'phones.json')
        const phones = fs.readFileSync(phonesPath, 'utf8');

        response.statusCode = 200;
        response.json(JSON.parse(phones));
    } catch (e) {
        response.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on - http://localhost:${PORT}`)
});

export default sl(app);

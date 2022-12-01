const { Phones } = require("../models/phones");
require('dotenv/config');

class phonesController {
    async getAllPhones(request, response) {
        try {
            const phonesFromDB = await Phones.findAll();

            response.statusCode = 200;
            response.json(phonesFromDB);
        } catch (e) {
            response.sendStatus(500);
        }
    }

    async getOnePhone(request, response) {
        try {
            const { phoneid } = request.params;
            const currentPhone = await Phones.findOne({
                where: {
                    id: phoneid,
                }
            });

            if (!currentPhone) {
                response.statusCode = 404;
                response.json({ error: 'doesnt exist' });
            }

            response.statusCode = 200;
            response.json(currentPhone);
        } catch (e) {
            response.sendStatus(500);
        }
    }

    createPhone(request, response) {
        try {
            response.statusCode = 200;
        } catch (e) {
            response.sendStatus(500);
        }
    }

    updatePhone(request, response) {
        try {
            response.statusCode = 200;
        } catch (e) {
            response.sendStatus(500);
        }
    }

    async deletePhone(request, response) {
        try {
            const { phoneid } = request.params;
            const currentPhone = await Phones.findOne({
                where: {
                    id: phoneid,
                }
            });

            if (!currentPhone) {
                response.statusCode = 404;
                response.json({ error: 'doesnt exist' });
            }

            await currentPhone.destroy();

            response.statusCode = 204;
            response.json({message: 'deleted'});
        } catch (e) {
            response.sendStatus(500);
        }
    }
}

module.exports = {
    phonesController,
}

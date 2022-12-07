const { Phones } = require("../models/phones");
const { Op } = require("sequelize");
require('dotenv/config');

class phonesController {
    async getAllPhones(request, response) {
        try {
            const searchOptions = {};
            const { page, onPage, newest, cheapest } = request.query;

            if (page && onPage) {
                const end = +page * +onPage;
                const start = end - +onPage;

                searchOptions.where = {
                    id: {
                        [Op.and]: {
                            [Op.gt]: start,
                            [Op.lte]: end
                        },
                    },
                };
            } else if (newest) {
                searchOptions.where = {
                    year: {
                        [Op.eq]: 2019,
                    },
                };
            } else if (cheapest) {
                searchOptions.where = {
                    price: {
                        [Op.lt]: 700,
                    },
                };
                searchOptions.order = [
                    ['price', 'ASC'],
                ]
            }

            const phonesFromDB = await Phones.findAll(searchOptions);

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
                    id: +phoneid,
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

    async getOnePhoneBySlug(request, response) {
        try {
            const { phoneSlug } = request.params;
            const currentPhone = await Phones.findOne({
                where: {
                    itemId: phoneSlug,
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

    async getSamePhonesBySlug(request, response) {
        try {
            const { phoneSlug } = request.params;
            const currentPhones = await Phones.findAll({
                where: {
                    itemId: {
                        [Op.substring]: phoneSlug,
                    },
                },
            });

            if (!currentPhones) {
                response.statusCode = 404;
                response.json({ error: 'doesnt exist' });
            }

            const exactlySameModels = currentPhones.filter(item => {
                return item.image.split('/')[2] === phoneSlug;
            });

            response.statusCode = 200;
            response.json(exactlySameModels);
        } catch (e) {
            response.sendStatus(500);
        }
    }

    async createPhone(request, response) {
        try {
            response.statusCode = 200;
        } catch (e) {
            response.sendStatus(500);
        }
    }

    async updatePhone(request, response) {
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

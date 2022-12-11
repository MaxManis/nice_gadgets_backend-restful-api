'use strict';

const express = require('express');
const { phonesController } = require('./phonesController');

const router = express.Router();
const phones = new phonesController();

router.get('/', phones.getAllPhones);

router.get('/:phoneid', phones.getOnePhone);

router.get('/one/:phoneSlug', phones.getOnePhoneBySlug);

router.get('/same/:phoneSlug', phones.getSamePhonesBySlug);

router.post('/', phones.getOnePhone);

router.patch('/:phoneid', phones.getOnePhone);

router.delete('/:phoneid', phones.getOnePhone);

module.exports = router;

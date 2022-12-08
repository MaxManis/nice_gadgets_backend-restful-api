'use strict';

const { Users } = require('../models/users');

async function getByEmail(email) {
  return await Users.findOne({
    where: {
      email,
    },
  });
}

function normalize({ id, name, email, activationToken }) {
  return { id, name, email, active: !activationToken};
}

module.exports = {
  getByEmail,
  normalize,
};

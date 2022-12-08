'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database-setup');
require('dotenv/config');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activationToken: {
    type: DataTypes.STRING,
    field: 'activation_token',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'nice-gadgets-users',
  updatedAt: false,
});

module.exports = {
  Users,
};

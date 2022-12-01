'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database-setup');
require('dotenv/config');

const Phones = sequelize.define('phones', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  screen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'nice-gadgets-phones',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  Phones,
};

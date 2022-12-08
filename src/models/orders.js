'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database-setup');
require('dotenv/config');

const Orders = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderList: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: 'order_list',
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'nice-gadgets-orders',
  updatedAt: false,
});

module.exports = {
  Orders,
};

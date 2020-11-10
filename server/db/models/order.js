// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderTotal: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['pending', 'complete', 'cancelled']
  }
})

module.exports = Order

// remove all commented out code before merging to main
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
  // small, but I'm noticing that your Home status uses uppercase whereas this status is lowercase
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['pending', 'complete', 'cancelled']
  }
})

module.exports = Order

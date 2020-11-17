const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING
  },
  orderTotal: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['Pending', 'Complete', 'Cancelled']
  }
})

module.exports = Order

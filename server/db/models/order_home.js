const Sequelize = require('sequelize')
const db = require('../db')

const Order_Home = db.define('order_home', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  timestamps: false
})

module.exports = Order_Home

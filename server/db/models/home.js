const sequelize = require('sequelize')
// extra Sequelize import, we should remove one
const Sequelize = require('sequelize')
const db = require('../db')

const Home = db.define('home', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  // Could type be an ENUM? What are the possible values for it?
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
  type: Sequelize.INTEGER,
  allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      isIn:[[ 'Available', 'Sold', 'In-contract']]
    }
  },
  // another validation here could be a minimum value (should never go below 0)
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

module.export = Home

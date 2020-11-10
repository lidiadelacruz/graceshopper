const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const Home = db.define('home', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
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
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

module.export = Home

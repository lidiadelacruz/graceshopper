const Sequelize = require('sequelize')
const db = require('../db')

const Home = db.define('home', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
<<<<<<< HEAD
    allowNull: false,
    validate:{
      isIn:[[ 'Old House', 'Eco-friendly', 'Haunted']]
    }
  },
  price: {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    min: 1
  }
=======
    allowNull: false
    // do we want to add categories? Old House, Haunted, Eco-Friendly
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
>>>>>>> 18ce0e87fa989d87a6f7b51c82e481a15180cd9c
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Available', 'Sold', 'In-contract']]
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Home

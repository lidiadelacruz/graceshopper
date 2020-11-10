const User = require('./user')
const Home = require('./home')
const Order = require('./order')
const Payment = require('./payment')

// ASSOCIATIONS
User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Home, {through: 'Order_Home'})
Home.belongsToMany(Order, {through: 'Order_Home'})

User.belongsToMany(Payment, {through: 'User_Payment'})
Payment.belongsToMany(User, {through: 'User_Payment'})

Order.hasOne(Payment)
Payment.belongTo(Order)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Home,
  Order,
  Payment
}

const User = require('./user')
const Home = require('./home')
const Order = require('./order')
const PaymentInfo = require('./paymentInfo')

// ASSOCIATIONS
User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Home, {through: 'Order_Home'})
Home.belongsToMany(Order, {through: 'Order_Home'})

User.belongsToMany(PaymentInfo, {through: 'User_PaymentInfo'})
PaymentInfo.belongsToMany(User, {through: 'User_PaymentInfo'})

Order.hasOne(PaymentInfo)
PaymentInfo.belongTo(Order)

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
  PaymentInfo
}

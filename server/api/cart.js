const {Order, Order_Home, Home} = require('../db')
const router = require('express').Router()

// GET
router.get('/', async (req, res, next) => {
  try {
    console.log(req.ip)
    let currentCart
    if (req.user) {
      ;[currentCart] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          orderStatus: 'Pending'
        },
        include: Home
      })
    } else {
      ;[currentCart] = await Order.findOrCreate({
        where: {
          ip: req.sessionID,
          orderStatus: 'Pending'
        },
        include: Home
      })
    }
    res.send(currentCart)
  } catch (error) {
    next(error)
  }
})

//EDIT
router.put('/', async (req, res, next) => {
  try {
    let updateOrder
    const home = await Home.findByPk(req.body.home.id)
    if (home.inventory < 1) return res.sendStatus(401)
    if (req.user) {
      ;[updateOrder] = await Order.findOrCreate({
        where: {
          userId: req.body.user.id,
          orderStatus: 'Pending'
        },
        include: Home
      })
    } else {
      ;[updateOrder] = await Order.findOrCreate({
        where: {
          ip: req.sessionID,
          orderStatus: 'Pending'
        },
        include: Home
      })
    }
    await updateOrder.addHome(home, {through: {quantity: 1}})
    home.inventory--
    if (home.inventory < 1) home.status = 'Sold'
    await home.save()
    const newCart = await Order.findByPk(updateOrder.id, {
      include: Home
    })
    newCart.orderTotal += home.price
    await newCart.save()
    res.send(newCart)
  } catch (error) {
    next(error)
  }
})

//Route for Order_homes put request

router.put('/:orderId/:homeId', async (req, res, next) => {
  try {
    const updateOrderQty = await Order_Home.findOrCreate({
      where: {
        orderId: req.params.orderId
      }
    })
    await Order_Home.increment('quantity', {
      by: 1,
      where: {orderId: req.params.orderId, homeId: req.params.homeId}
    })
    res.send(updateOrderQty)
  } catch (error) {
    next(error)
  }
})

//REMOVE
router.delete('/:homeId', async (req, res, next) => {
  try {
    let cart
    const home = await Home.findByPk(req.params.homeId)
    if (req.user) {
      ;[cart] = await req.user.getOrders({
        where: {
          orderStatus: 'Pending'
        }
      })
    } else {
      cart = await Order.findOne({
        where: {
          ip: req.sessionID,
          orderStatus: 'Pending'
        }
      })
    }
    await home.update({status: 'Available'})
    await cart.removeHome(home)
    cart.orderTotal -= home.price
    await cart.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

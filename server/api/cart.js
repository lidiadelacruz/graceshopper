const {Order, Order_Home} = require('../db')
const Home = require('../db/models/home')

const router = require('express').Router()

//Add to the cart, edit, remove, get route

//Add
// router.post('/', async (req, res, next) => {
//   try {
//     console.log('REQBODY', req.body)
//     const addItemToCart = await Order_Home.create({
//       orderId: req.body.orderId,
//       homeId: req.body.home.id
//     })
//     res.send(addItemToCart)
//   } catch (error) {
//     next(error)
//   }
// })

// GET
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401)
    const [currentCart] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        orderStatus: 'Pending'
      },
      include: Home
    })
    res.send(currentCart)
  } catch (error) {
    next(error)
  }
})

//EDIT
router.put('/', async (req, res, next) => {
  try {
    const home = await Home.findByPk(req.body.home.id)
    if (home.inventory < 1) return res.sendStatus(401)
    const [updateOrder] = await Order.findOrCreate({
      where: {
        userId: req.body.user.id,
        orderStatus: 'Pending'
      },
      include: Home
    })
    //const newOrderHome = await Order_Home.create({quantity:1})
    await updateOrder.addHome(home, {through: {quantity: 1}})
    home.inventory--
    if (home.inventory < 1) home.status = 'Sold'
    await home.save()
    const newCart = await Order.findByPk(updateOrder.id, {
      include: Home
    })
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
    const home = await Home.findByPk(req.params.homeId)
    const [cart] = await req.user.getOrders({
      where: {
        orderStatus: 'Pending'
      }
    })
    await cart.removeHome(home)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// router.delete('/:orderId/:homeId', async (req, res, next) => {
//   try {
//     await Order_Home.destroy({
//       where: {
//         orderId: req.params.orderId,
//         homeId: req.params.homeId
//       }
//     })
//     res.sendStatus(200)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:orderId', async (req, res, next) => {
//   try {
//     await Order.destroy({
//       where: {
//         id: req.params.orderId
//       }
//     })
//     res.sendStatus(200)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router

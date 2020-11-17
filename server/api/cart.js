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
    if (req.body.id) {
      const currentCart = await Order.findOrCreate({
        where: {
          userId: req.body.id,
          orderStatus: 'Pending'
        },
        include: [{model: Home}]
      })
      res.send(currentCart)
    } //else {
    //  const cart = await Order.findOrCreate({
    //   where: {
    //     sessionId: 1,
    //     orderStatus: 'Pending'
    //   }
    //  })
    // }
  } catch (error) {
    next(error)
  }
})

//EDIT
router.put('/', async (req, res, next) => {
  try {
    const updateOrder = await Order.findOrCreate({
      where: {
        userId: req.body.user,
        orderStatus: 'Pending'
      },
      include: [{model: Home}]
    })
    await updateOrder.update({homes: [...homes, req.body.home]})
    res.send(updateOrder)
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
router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

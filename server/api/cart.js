const {Order} = require('../db')

const router = require('express').Router()

//Add to the cart, edit, remove, get route

//Add
router.post('/', async (req, res, next) => {
  try {
    const addItemToCart = await Order.create(req.body)
    res.send(addItemToCart)
  } catch (error) {
    next(error)
  }
})

// GET
router.get('/:orderId', async (req, res, next) => {
  try {
    const currentCart = await Order.findOne({
      where: {
        id: req.params.orderId
      }
    })
    res.send(currentCart)
  } catch (error) {
    next(error)
  }
})

//EDIT
router.put('/:orderId', async (req, res, next) => {
  try {
    const updateOrder = await Order.findByPk(req.params.orderId)
    await updateOrder.update(req.body)
    res.send(updateOrder)
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

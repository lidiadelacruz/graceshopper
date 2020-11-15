const router = require('express').Router()

//To get associations, you must import from:
//this line will navigate us to '../db/models/index.js to get out models.
const {Order} = require('../db/models')

module.exports = router

//Purpose of these express api routes: to get database information about purchase orders in our e-commerce site.
//This information may be viewed by a user to see their orders, as well as, an admin to see all the orders and make desired changes.
//admin/user may need to see order id, shipping address, order total, order status, and userId associated with the order. We will want admins to be able to edit, add and view the orders.

//Note: a user should only be allowed to see their order, otherwise, seems like we need to limit access

const adminsOnly = (req, res, next) => {
  //checks to see if there is a logged in user and if yes, then if isAdmin is false for currently logged in user.
  //Questions: where are we getting user from?
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('This page is only viewable by admin users.')
    //error status response code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource
    error.status = 401
    return next(error)
  }
  next()
}

const adminOrByUserId = (req, res, next) => {
  // This logic should be double checked.
  if (req.user && (req.user.isAdmin || req.params.id === req.user.id)) {
    next()
  } else {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
}

//route to view all order information
//mounted on /api/orders b/c of app.use in index.js in server.
// currently, adminsOnly is breaking this get route
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        'id',
        'shippingAddress',
        'orderTotal',
        'orderStatus',
        'userId'
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//route to view any single order
//mounted on /api/orders/:orderId
router.get('/:orderId', adminOrByUserId, async (req, res, next) => {
  try {
    res.json(await Order.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

//route to add an order
//mounted on /api/orders

// do we want the logged-in user to be able to post an order? i.e. by clicking on checkout from the cart?
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.send(newOrder)
  } catch (err) {
    next(err)
  }
})

//route to update/edit a single order
//mounted on /api/orders/:orderId

router.put('/:orderId', adminsOnly, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (order) {
      const updatedOrder = await order.update(req.body)
      //200 - means OK success
      res.status(200).send(updatedOrder)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

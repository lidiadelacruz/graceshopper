const router = require('express').Router()
const {PaymentInfo} = require('../db/models')

module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('This page is only viewable by admin users.')
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

//mounted on /api/paymentInfo
//for admins only - very sensitive information

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const allPaymentInfo = await PaymentInfo.findAll()
    res.json(allPaymentInfo)
  } catch (err) {
    next(err)
  }
})

//mounted on /api/paymentInfo/:paymentInfoId
//for admins only or logged in user to see their personal information
router.get('/:paymentInfoId', adminOrByUserId, async (req, res, next) => {
  try {
    res.json(await PaymentInfo.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

//mounted on /api/paymentInfo
//allow admins or logged in user to add paymentInfo
router.post('/', adminOrByUserId, async (req, res, next) => {
  try {
    const newPaymentInfo = await PaymentInfo.create(req.body)
    res.send(newPaymentInfo)
  } catch (err) {
    next(err)
  }
})

//mounted on /api/paymentInfo/:paymentInfoId
//allow admins or logged in user to update paymentInfo
router.put('/:paymentInfoId', adminOrByUserId, async (req, res, next) => {
  try {
    const paymentInfo = await PaymentInfo.findByPk(req.params.id)
    if (paymentInfo) {
      const updatedpaymentInfo = await PaymentInfo.update(req.body)
      //200 - means OK success
      res.status(200).send(updatedpaymentInfo)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

//mounted on /api/paymentInfo/:paymentInfoId
//allow admins or logged in user to delete paymentInfo
router.delete('/:paymentInfoId', adminOrByUserId, async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) return res.sendStatus(400)

    await PaymentInfo.destroy({
      where: {
        id: req.params.id
      }
    })
    //204 - request has succeeded
    res.sendStatus(204).end()
  } catch (err) {
    next(err)
  }
})

const router = require('express').Router()
const {PaymentInfo} = require('../db/models')
const {adminsOnly, adminOrByUserId} = require('./util')

module.exports = router

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

//mounted on /api/paymentInfo/:id
//for admins only or logged in user to see their personal information
router.get('/:id', adminOrByUserId, async (req, res, next) => {
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
    const newPaymentInfo = await PaymentInfo.create({
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      creditOrDebitCardNumber: req.body.creditOrDebitCardNumber,
      cardExpirationDate: req.body.cardExpirationDate,
      cardCVV: req.body.cardCVV,
      billingAddress: req.body.billingAddress,
      billingZipcode: req.body.billingZipcode,
      // including users so the User_Payment through table updates
      users: [...users, req.body.user]
    })
    res.send(newPaymentInfo)
  } catch (err) {
    next(err)
  }
})

//mounted on /api/paymentInfo/:id
//allow admins or logged in user to update paymentInfo
router.put('/:id', adminOrByUserId, async (req, res, next) => {
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

//mounted on /api/paymentInfo/:id
//allow admins or logged in user to delete paymentInfo
router.delete('/:id', adminOrByUserId, async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) return res.sendStatus(400)

    await PaymentInfo.destroy({
      where: {
        id: req.params.id
      }
    })
    //204 - request has succeeded
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

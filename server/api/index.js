const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/homes', require('./homes'))
router.use('/orders', require('./order'))
router.use('/paymentInfo'), require('./paymentInfo')

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router

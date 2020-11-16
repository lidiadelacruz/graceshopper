const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// same note here about consolidating this reusable function

const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
  next()
}

// same note here about consolidating this reusable function

const adminOrByUserId = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.params.id === req.user.id)) {
    next()
  } else {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
}

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id, fullName, and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'fullName',
        'email',
        'isAdmin',
        'isLoggedIn'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminOrByUserId, async (req, res, next) => {
  try {
    res.json(await User.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

// do we need limits on creating users?
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) return res.sendStatus(400)
    const user = await User.findByPk(+req.params.id)
    if (!user) return res.sendStatus(404)
    user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', adminOrByUserId, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

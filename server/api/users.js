const router = require('express').Router()
const {User} = require('../db/models')
const {adminsOnly, adminOrByUserId} = require('./util')
module.exports = router

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

//updates a user to be an admin
router.put('/:id/admin', adminOrByUserId, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update({isAdmin: !user.isAdmin})
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

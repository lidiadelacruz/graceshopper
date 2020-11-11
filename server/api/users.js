const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id, fullName, and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'fullName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await User.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        email: req.body.email
      }
    })
    if (wasCreated) return res.status(201).send(user)
    else return res.sendStatus(409)
  } catch (err) {
    next(err)
  }
})

// Add security around this route to prevent anyone from being able to delete a user
router.delete('/:id', async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) return res.sendStatus(400)
    const user = await User.findByPk(+req.params.id)
    if (!user) return res.sendStatus(404)
    user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
  /*
  try {
    await User.destroy({ where: {id: req.params.id} });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
  */
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

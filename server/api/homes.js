const router = require('express').Router()
const {Home} = require('../db/index')

const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const allHomes = await Home.findAll()
    res.json(allHomes)
  } catch (error) {
    next(error)
  }
})

router.get('/:homesId', async (req, res, next) => {
  try {
    const home = await Home.findByPk(req.params.homesId)
    res.json(home)
  } catch (error) {
    next(error)
  }
})

// admin to delete , put a home

router.delete('/:homesId', adminsOnly, async (req, res, next) => {
  try {
    await Home.destroy({
      where: {
        id: req.params.homesId
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.post('/:homesId', adminsOnly, async (req, res, next) => {
  try {
    const home = await Home.findByPk(req.params.homesId)
    await homes.update(req.body)
    res.send(home)
  } catch (error) {
    next(error)
  }
})

// PUT route?

module.exports = router

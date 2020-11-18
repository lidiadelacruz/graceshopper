const router = require('express').Router()
const {Home} = require('../db/index')
const {adminsOnly} = require('./util')

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

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const home = await Home.create(req.body)
    res.json(home)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const home = await Home.findByPk(req.params.id)
    await home.update(req.body)
    res.status(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router

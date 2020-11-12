const router = require('express').Router()
const {Home} = require('../db/index')

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

module.exports = router

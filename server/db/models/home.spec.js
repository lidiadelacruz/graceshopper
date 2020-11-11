const {expect} = require('chai')
const home = require('server/db/models/home.js')
const {Home} = require('.')
const db = require('../db')

describe('Home model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: type and inventory', () => {
    describe('description', () => {
      it('descrption is a string', async () => {
        const oldHome = await Home.create({
          type: 'Old Home',
          inventory: 0,
        })
        expect(oldHome.type).to.equal( 'Old Home','was not able to create a home with Old Home')
        expect(oldHome.inventory).to.equal( 0, 'Was not able to create a home with inventory 0')
      })
      it('type cannot be null', async () => {
        await expect(
          Home.create({}),
          "We shouldn't be able to create a user with no name"
        ).to.be.rejected
      })
    })
  })
})

  describe('instanceMethods', () => {
    describe('correctP')
  })

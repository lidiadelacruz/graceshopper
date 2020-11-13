const {expect} = require('chai')
const Home = require('server/db/models/home.js')
const {db} = require('../db')

describe('Home model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: type and inventory', () => {
    describe('description', () => {
      it('descrption is a string', async () => {
        const oldHome = await Home.create({
          type: 'Old Home',
          inventory: 0
        })
        expect(oldHome.type).to.equal(
          'Old Home',
          'was not able to create a home with Old Home'
        )
        expect(oldHome.inventory).to.equal(
          0,
          'Was not able to create a home with inventory 0'
        )
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
  describe('correctType', () => {
    let house

    beforeEach(async () => {
      house = await Home.create({
        type: 'Haunted',
        inventory: 1
      })
    })
    it('returns true if the inventory is correct', () => {
      expect(house.inventory(1).to.be.equal(true))
    })
    it('returns false if the password is incorrect', () => {
      expect(house.inventory(2).to.be.equal(false))
    })
  })
})

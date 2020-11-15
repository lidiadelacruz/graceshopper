const chai = require('chai')
const {expect} = require('chai')
const Home = require('./home')
const db = require('../db')
const chaiAsPromised = require('chai-as-promised') //await expect to.be rejected
chai.use(chaiAsPromised)

describe('Home model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: type and inventory', () => {
    describe('description', () => {
      it('description is a string', async () => {
        const oldHome = await Home.create({
          type: 'Old House',
          inventory: 0,
          description: 'Test Description',
          price: 1.0,
          status: 'Available',
          imageUrl: ''
        })
        expect(oldHome.type).to.equal(
          'Old House',
          'was not able to create a home with Old Home'
        )
        expect(oldHome.inventory).to.equal(
          0,
          'Was not able to create a home with inventory 0'
        )
      })

      it('type cannot be null', async () => {
        await expect(
          Home.create({
            type: null,
            inventory: 0,
            description: 'Test Description',
            price: 1.0,
            status: 'Available',
            imageUrl: ''
          }),
          "We shouldn't be able to create a home with no type"
        ).to.be.rejected
      })
    })
  }) // end of describe('Basic Fields: type and inventory')

  describe('inventory field check', () => {
    describe('correct inventory', () => {
      let house

      beforeEach(async () => {
        house = await Home.create({
          type: 'Haunted',
          inventory: 1,
          price: 1.0,
          status: 'Available',
          imageUrl: '',
          description: 'Test Description'
        })
      })

      it('returns the correct inventory of the Home instance', () => {
        expect(house.inventory).to.be.equal(1)
      })
    }) // end describe('correct inventory')
  }) // end describe('inventory field check')
}) // end describe('Home model')

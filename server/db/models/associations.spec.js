/* global describe beforeEach it */

const chai = require('chai')
const {expect} = require('chai')
const faker = require('faker')
const {db} = require('../index')
const {Home, User, PaymentInfo, Order} = require('./index')
// const Home = db.model('home')
// const User = db.model('user')
// const PaymentInfo = db.model('paymentInfo')
// const Order = db.model('order')
const chaiAsPromised = require('chai-as-promised') //await expect to.be rejected
chai.use(chaiAsPromised)
//const Sequelize = require('sequelize')

describe('Model Associations', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('test', () => {
    let claire
    let home
    let creditCard
    let order1
    let order2

    beforeEach(async () => {
      claire = await Promise.all([
        User.create(
          {
            firstName: 'Claire',
            lastName: 'Brown',
            email: 'claire@neverbefore.com',
            isAdmin: false,
            password: 'dreams'
          },
          {hooks: false}
        )
      ])
      home = await Home.create({
        description: 'Skittles',
        type: 'Old House',
        price: faker.commerce.price(),
        imageUrl: faker.image.business(),
        status: 'Available',
        inventory: 1
      })
      creditCard = await PaymentInfo.create({
        firstName: faker.name.firstName(),
        middleInitial: faker.random.alpha(),
        lastName: faker.name.lastName(),
        creditOrDebitCardNumber: '4485177968389306',
        cardExpirationDate: '11/2024',
        cardCVV: '123',
        billingAddress: faker.address.streetAddress(),
        zipCode: faker.address.zipCode()
      })
      order1 = await Promise.all([
        Order.create({
          shippingAddress: '1234 S 5th Ave, Seattle, WA 98104',
          orderStatus: 'Pending'
        })
      ])
      order2 = await Promise.all([
        Order.create({
          shippingAddress: '5678 N 10th St, Worcester, MA 01609',
          orderStatus: 'Pending'
        })
      ])

      await order1.setUser(claire, {hooks: false})
      await claire.addOrder(order2, {hooks: false})
    })

    describe('user-order association', () => {
      it('An order belongs to a user', async () => {
        expect(await order1.getUser()).to.be.equal(claire)
      })
      //xit('A user has many orders', async () => {})
    })

    // describe('order-home association', () => {
    //   xit('An order belongs to many homes', () => {
    //     expect(order.getParent()).to.be.a('claire')
    //   })

    //   xit('A home belongs to many orders', async () => {})
    // })

    // describe('paymentInfo-user association', () => {
    //   xit('A payment belongs to many users', () => {
    //     expect(order.getParent()).to.be.a('claire')
    //   })

    //   xit('A user belongs to many payments', async () => {})
    // })

    // describe('paymentInfo-user association', () => {
    //   xit('An order has one payment', () => {
    //     expect(order.getParent()).to.be.a('claire')
    //   })

    //   xit('A payment belongs to an order', async () => {})
    // })
  })
})

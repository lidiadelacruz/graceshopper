/* global describe beforeEach it */

const chai = require('chai')
const {expect} = require('chai')
const {db} = require('../index')
const Order = db.model('order')
const chaiAsPromised = require('chai-as-promised') //await expect to.be rejected
chai.use(chaiAsPromised)

describe('Order model', () => {
  beforeEach(async () => {
    const testOrders = await Promise.all([
      Order.create({
        shippingAddress: `444 West Alpine St., Chicago, IL 60640`,
        orderTotal: 450000,
        orderStatus: 'Pending'
      }),
      Order.create({
        shippingAddress: `123 Password Ln., Chicago, IL 60613`,
        orderTotal: -100,
        orderStatus: 'Cancelled'
      }),
      Order.create({
        shippingAddress: `444 West Alpine St., Chicago, IL 60640`,
        orderTotal: 10000000,
        orderStatus: 'Unknown'
      })
    ])
    return db.sync({force: true})
  })
  describe('shippingAddress', () => {
    it('is a populated string', () => {
      expect(typeof Order.shippingAddress).to.equal('string')
      if (Order.shippingAddress === '' || Order.shippingAddress === null) {
        return expect(Order.shippingAddress).to.be.rejected
      }
    })
  })
  describe('orderTotal', () => {
    it('is a number', () => {
      expect(typeof Order.orderTotal).to.equal('number')
    })
    it('does not accept a negative number', () => {
      if (Order.orderTotal > 0) {
        return expect(Order.orderTotal).to.be.rejected
      }
    })
  })
  describe('orderStatus', () => {
    it('is a string', () => {
      expect(typeof Order.orderStatus).to.equal('string')
    })
    it('is Pending, Complete, or Cancelled', () => {
      if (
        Order.orderStatus !== 'Pending' ||
        Order.orderStatus !== 'Complete' ||
        Order.orderStatus !== 'Cancelled'
      ) {
        return expect(Order.orderStatus).to.be.rejected
      }
    })
  })
})

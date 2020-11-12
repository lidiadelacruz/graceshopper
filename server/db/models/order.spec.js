/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(async () => {
    const testOrders = await Promise.all([
      Order.create({shippingAddress: `444 West Alpine St., Chicago, IL 60640`, orderTotal: 450000, orderStatus: 'Pending'}),
      Order.create({shippingAddress: `123 Password Ln., Chicago, IL 60613`, orderTotal: -100, orderStatus: 'Cancelled'}),
      Order.create({shippingAddress: `444 West Alpine St., Chicago, IL 60640`, orderTotal: 10000000, orderStatus: 'Unknown'})
    ])
    return db.sync({force: true})
  })
  describe('shippingAddress', () => {
    it('is a string', async () => {

    })
  })
})

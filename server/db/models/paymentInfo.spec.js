/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const PaymentInfo = db.model('paymentInfo')

describe('PaymentInfo model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: firstName, middleInitial,lastName', () => {
    describe('firstName', () => {
      //We should be able to create a firstname with a string containing text.
      it('firstName is a string', async() => {
        const william = await PaymentInfo.create({firstName: 'William'})
        expect(william.firstName).to.equal(
          'William',
          'Was not able to create a user with name William'
        )
      })

      //we should not be able to create a first name with a string that is empty.
      it('firstName cannot be an empty string', async() => {
        await expect(
          PaymentInfo.create({firstName: ''}),
          "We shouldn't be able to create a firstName with an empty string"
        ).to.be.rejected
      })

      //we should be able to create a lastname with a string containing text.
      it('lastName is a string', async() => {
        const baxter = await PaymentInfo.create({lastName: 'Baxter'})
        expect(baxter.lastName).to.equal(
          'Baxter',
          'Was not able to create a user with last name Baxter'
        )
      })
    })
  })
})

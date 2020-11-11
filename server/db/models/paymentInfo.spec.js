/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const PaymentInfo = db.model('paymentInfo')

describe('PaymentInfo model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('PaymentInfo Fields: firstName, lastName', () => {
    describe('firstName and lastName', () => {
      //We should be able to create a firstname with a string containing text.
      it('firstName is a string', async () => {
        const william = await PaymentInfo.create({
          firstName: 'William',
          lastName: 'Test',
          creditOrDebitCardNumber: '368683198837147',
          cardExpirationDate: '11/2020',
          cardCVV: '123',
          billingAddress: '2508 Deer Haven Drive, Greenville, SC',
          zipCode: '11215'
         })
        expect(william.firstName).to.equal(
          'William',
          'Was not able to create a user with name William'
        )
      })

      //we should not be able to create a first name with a string that is empty.
      it('firstName cannot be an empty string', async () => {
        await expect(
          PaymentInfo.create({
            firstName: '',
            lastName: 'Test',
            creditOrDebitCardNumber: '368683198837147',
            cardExpirationDate: '11/2020',
            cardCVV: '123',
            billingAddress: '2508 Deer Haven Drive, Greenville, SC',
            zipCode: '11215'}),
          "We shouldn't be able to create a firstName with an empty string"
        ).to.be.rejected
      })

      //we should be able to create a lastname with a string containing text.
      it('lastName is a string', async () => {
        const baxter = await PaymentInfo.create({
          firstName: 'William',
          lastName: 'Baxter',
          creditOrDebitCardNumber: '368683198837147',
          cardExpirationDate: '11/2020',
          cardCVV: '123',
          billingAddress: '2508 Deer Haven Drive, Greenville, SC',
          zipCode: '11215'
        })
        expect(baxter.lastName).to.equal(
          'Baxter',
          'Was not able to create a user with last name Baxter'
        )
      })
    })
  })
  describe('card details', () => {
    describe('cardExpirationDate and cardCVV fields', () => {
      let testPaymentInfo

      beforeEach(async () => {
        testPaymentInfo = await PaymentInfo.create({
        firstName: 'William',
        lastName: 'Baxter',
        creditOrDebitCardNumber: '368683198837147',
        cardExpirationDate: '11/2020',
        cardCVV: '123',
        billingAddress: '2508 Deer Haven Drive, Greenville, SC',
        zipCode: '11215'
        })
      })

      it('returns the number 7 if the cardExpirationDate is the correct length', () => {
        expect(testPaymentInfo.cardExpirationDate.length).to.equal(7, 'cardExpirationDate length was different than expected')
      })

      it('returns the number 3 if the cardExpirationDate is the correct length', () => {
        expect(testPaymentInfo.cardCVV.length).to.equal(3, 'cardCVV length was different than expected')
      })
    })
  })
})

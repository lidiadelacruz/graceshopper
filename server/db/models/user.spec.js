/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: name and email', () => {
    describe('firstName', () => {
      it('name is a string', async () => {
        const hannah = await User.create({firstName: 'HANNAH'})
        expect(hannah.firstName).to.equal(
          'HANNAH',
          'Was not able to create a user with name HANNAH'
        )
      })

      it('name cannot be null', async () => {
        // We shouldn't be able to create a user without a name.
        await expect(
          User.create({}),
          "We shouldn't be able to create a user with no name"
        ).to.be.rejected
      })

      it('name cannot be an empty string', async () => {
        // We also shouldn't be able to create a user with an empty name.
        await expect(
          User.create({firstName: ''}),
          "We shouldn't be able to create a user with an empty name"
        ).to.be.rejected
      })
    })
  }) // end describe('Basic Fields: name and email')

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          // add required fields
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

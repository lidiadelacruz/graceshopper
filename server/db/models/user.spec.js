/* global describe beforeEach it */

const chai = require('chai')
const {expect} = require('chai')
const {db, User} = require('../index')
const chaiAsPromised = require('chai-as-promised') //await expect to.be rejected
chai.use(chaiAsPromised)

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: name and email', () => {
    it('name is a string', async () => {
      const claire = await User.create({
        firstName: 'Claire',
        lastName: 'Brown',
        email: 'claire@neverbefore.com'
      })
      expect(claire.firstName).to.equal(
        'Claire',
        'Was not able to create a user with name Claire'
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
  }) // end describe('Basic Fields: name and email')

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let yael

      beforeEach(async () => {
        yael = await User.create({
          firstName: 'Yael',
          lastName: 'Bassal',
          email: 'yael@neverbefore.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(yael.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(yael.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

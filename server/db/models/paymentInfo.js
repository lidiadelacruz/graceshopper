const Sequelize = require('sequelize')
const db = require('../db')

const PaymentInfo = db.define('paymentInfo', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      //cannot be an empty string
      notEmpty: true
    }
  },
  //made this field optional since not all folks have a middle name.
  middleInitial: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      //cannot be an empty string
      notEmpty: true
    }
  },
  creditOrDebitCardNumber: {
    // should this be .BIGINT ?
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      //isCreditCard validation checks for valid credit card numbers
      isCreditCard: true
    }
  },
  cardExpirationDate: {
    //date documentation, link: https://sequelize.org/v5/. An alternative could be to use a string datatype.
    //DATEONLY gives us date w/o time.
    type: Sequelize.DATEONLY,
    validate: {
      //checks if input is a date
      isDate: true,
      //today's date -- there is a way to not hard code today's date!!
      isAfter: '2020-11-11'
    }
  },
  cardCVV: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // thinks isNumeric works with strings.
      isNumeric: true,
      //isThreeDigits is a custom validator used to check if a user inputs a cvv of a correct length of 3 or 4 digits. Documentation: https://sequelize.org/master/manual/validations-and-constraints.html
      //alternative can be len: [3,4] or a variation of this.
      isThreeOrFourDigits(value) {
        if (value.length !== 3 || value.length !== 4) {
          throw new Error('A cvv can only be three or four digits long.')
        }
      }
    }
  },
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    //VARCHAR is also a datatype we could use for zipcodes. I left it as string for "global" users. We can also do VARCHAR(5) for just United States zipcodes.
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = PaymentInfo

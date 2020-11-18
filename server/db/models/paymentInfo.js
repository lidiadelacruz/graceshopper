const Sequelize = require('sequelize')
const db = require('../db')

const PaymentInfo = db.define('paymentInfo', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
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
      notEmpty: true
    }
  },
  creditOrDebitCardNumber: {
    //Yes, isCreditCard can be used with string. see: https://github.com/typestack/class-validator
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      //isCreditCard validation checks for valid credit card numbers
      isCreditCard: true
    }
  },
  cardExpirationDate: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAfter: function() {
        let todaysDate = new Date()
        return `${todaysDate.getMonth()}/${todaysDate.getFullYear()}`
      }
    }
  },
  cardCVV: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      //isThreeDigits is a custom validator used to check if a user inputs a cvv of a correct length of 3 or 4 digits. Documentation: https://sequelize.org/master/manual/validations-and-constraints.html
      //alternative can be len: [3,4] or a variation of this.
      isThreeOrFourDigits(value) {
        if (value.length < 3 && value.length > 4) {
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
    //VARCHAR is also a datatype we could use for zipcodes. Left it as string for "global" users. We can also do VARCHAR(5) for just United States zipcodes.
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = PaymentInfo

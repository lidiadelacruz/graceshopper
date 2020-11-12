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
    //Yes, isCreditCard can be used with string. see: https://github.com/typestack/class-validator
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
      // think isNumeric works with strings.
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
    //VARCHAR is also a datatype we could use for zipcodes. I left it as string for "global" users. We can also do VARCHAR(5) for just United States zipcodes.
    type: Sequelize.STRING,
    allowNull: false
  }
})

//helper function - assists field for Card Expiration

// PaymentInfo.CardExpiryValidation = function() {
//   let todaysDate = new Date()
//   return `${todaysDate.getMonth()}/${todaysDate.getFullYear()}`
// }

module.exports = PaymentInfo

const Sequelize = require('sequelize')
const db = require('../db')

const PaymentInfo = db.define('paymentInfo', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  middleInitial: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  creditOrDebitCardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      //isCreditCard validation checks for valid credit card numbers
      isCreditCard: true,
    }
  },
  cardExpirationDate: {
    type: Sequelize.DATE,
    validate: {
      //TODAY'S DATE
      isAfter:
    }

  },
  cardCVV: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      //isThreeDigits is a custom validator used to check if a user inputs a cvv of a correct length of 3 or 4 digits. Documentation: https://sequelize.org/master/manual/validations-and-constraints.html
      //alternative can be len: [3,4] or a variation of this.
      isThreeDigits(value) {
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
    type: Sequelize.STRING,
    allowNull: false
  }
})

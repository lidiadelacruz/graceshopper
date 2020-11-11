const { green, red } = require("chalk");
const { db } = require("./server/db");
const { User, PaymentInfo } = require("../server/db/models");
const faker = require('faker');


const times = x => f => {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}

// create 100 users
const users = []
times(100)(() => users.push( {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}))
times(15)(() => users.push( {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isLoggedIn: true
}))
times(10)(() => users.push( {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isAdmin: true
}))
times(10)(() => users.push( {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isAdmin: true,
  isLoggedIn: true
}))

// create 100 payments
const paymentInfo = []
times(100)(() => PaymentInfo.push( {
  firstName: faker.name.firstName(),
  middleInitial: faker.random.alpha(),
  lastName: faker.name.lastName(),
  creditOrDebitCardNumber: faker.finance.creditCardNumber(),
  cardExpirationDate: faker.date.future(),
  cardCVV: faker.finance.creditCardCVV(),
  billingAddress: faker.address.streetAddress(),
  zipCode: faker.address.zipCode()
}))


const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Promise.all(users.map(user => {
      return User.create(user)
    }))

    await Promise.all(paymentInfo.map(payment => {
      return PaymentInfo.create(payment)
    }))

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}

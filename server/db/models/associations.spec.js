/* global describe beforeEach it */

const {expect} = require('chai')
const faker = require('faker')
const db = require('../index');
const Home = db.model('home');
const User = db.model('user');
const PaymentInfo = db.model('paymentInfo')
const Order = db.model('order')

describe('Model Associations', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    const claire = await User.Create( { 
      firstName: 'Claire',
      lastName: 'Brown',
      email: 'claire@neverbefore.com',
      isAdmin: false,
      password: 'dreams' 
    }, { hooks: false }
    );
    const home = await Home.Create( {
      description: 'Skittles',
      type: 'Old Homes',
      price: faker.commerce.price(),
      imageUrl: faker.image.business(),
      status: 'Available',
      inventory: 1
    });
    const creditCard = await PaymentInfo.Create( {
      firstName: faker.name.firstName(),
      middleInitial: faker.random.alpha(),
      lastName: faker.name.lastName(),
      creditOrDebitCardNumber: faker.finance.creditCardNumber(),
      cardExpirationDate: faker.date.future(),
      cardCVV: faker.finance.creditCardCVV(),
      billingAddress: faker.address.streetAddress(),
      zipCode: faker.address.zipCode()
    });
    const order = await Order.Create( {
      shippingAddress: '1234 S 5th Ave, Seattle, WA 98104',
      orderStatus: pending
    });
    describe('user-order association', () => {
      it('An order belongs to a user', () => {
        expect(order.getParent()).to.be.a('claire');
      })

      it('A user has many orders', async () => {
      
      })
    })

    describe('order-home association', () => {
      it('An order belongs to many homes', () => {
        expect(order.getParent()).to.be.a('claire');
      });

      it('A home belongs to many orders', async () => {
        
      });
    })
    
    describe('paymentInfo-user association', () => {
      it('A payment belongs to many users', () => {
        expect(order.getParent()).to.be.a('claire');
      });

      it('A user belongs to many payments', async () => {
        
      });
    })

    describe('paymentInfo-user association', () => {
      it('An order has one payment', () => {
        expect(order.getParent()).to.be.a('claire');
      });

      it('A payment belongs to an order', async () => {
        
      });
    })
  })
});

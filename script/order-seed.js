const { ForeignKeyConstraintError } = require("sequelize");

const orders = await Promise.all([
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Pending'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Pending'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Pending'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Pending'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Complete'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Complete'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Complete'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Complete'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Cancelled'}),
  Order.create({shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`, orderTotal: faker.commerce.price(), orderStatus: 'Cancelled'}),
])

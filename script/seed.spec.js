'use strict'
/* global describe it */

const seed = require('./seed')
// const chai = require('chai')
// const chaiAsPromised = require('chai-as-promised'); //await expect to.be rejected
// chai.use(chaiAsPromised)

describe('seed script', () => {
  it('completes successfully', seed)
})

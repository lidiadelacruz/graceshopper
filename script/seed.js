'use strict'

const db = require('../server/db')
const { User, Home } = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}



const seed = async () => {
  try {
    await db.sync({force: true})
    const homes = await Home.create[{
      description: 'Skittles',
      type: 'Old Homes',
      price: faker.commerce.price(),
      imageUrl: faker.image.business(),
      status: 'Available',
      inventory: 1
    }, {
      description: 'Skittles',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Skittles',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    },{
      description: 'Skittles',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Skittles',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    },{
      description: 'Chuckie',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl: 'https://80v.314.myftpupload.com/wp-content/uploads/2016/10/haunted-house.jpg?time=1605095805',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Chuckies Bride',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl: 'https://www.dailydot.com/wp-content/uploads/9f4/0b/0432745ad465a0810930e42bc72e5c22-768x384.jpg',
      status: 'Available',
      inventory: 1
    },{
      description: 'Mike Myers',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl: 'https://theluxuryspot.com/wp-content/uploads/2011/10/Haunted_House_by_AreYoU.jpg',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Freddy Kruger',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl: 'https://img-aws.ehowcdn.com/700x/cdn.onlyinyourstate.com/wp-content/uploads/2015/08/2825142048_5ba031169c_b-700x457.jpg',
      status: 'Available',
      inventory: 1
    },{
      description: 'IT',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl: 'https://ewscripps.brightspotcdn.com/dims4/default/4c3c902/2147483647/strip/true/crop/640x360+0+60/resize/1280x720!/quality/90/?url=https%3A%2F%2Fmediaassets.news5cleveland.com%2Fphoto%2F2018%2F10%2F02%2FClown%20House_1538500820162.jpg_99228188_ver1.0_640_480.jpg',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Skittles',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    },{
      description: 'Skittles',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Skittles',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    },{
      description: 'Skittles',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    }, {
      description: 'Skittles',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3dfaker.commerce.price()a8073-36e6-4cec-8c8c-87faker.commerce.price()6391058faker.commerce.price()0?wid=488&hei=488&fmt=pjpeg',
      status: 'Available',
      inventory: 1
    }

    ];

  }
  catch (err) {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  }
}

seed();







// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

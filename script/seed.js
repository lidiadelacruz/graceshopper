'use strict'

const {db} = require('../server/db')
const {User, Home, Order, PaymentInfo} = require('../server/db/models')
const faker = require('faker')

const times = x => f => {
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

// create 100 users
const users = []
times(100)(() =>
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  })
)
times(15)(() =>
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isLoggedIn: true
  })
)
times(10)(() =>
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: true
  })
)
times(10)(() =>
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: true,
    isLoggedIn: true
  })
)

// create 100 payments
const paymentInfo = []
times(100)(() =>
  paymentInfo.push({
    firstName: faker.name.firstName(),
    middleInitial: faker.random.alpha(),
    lastName: faker.name.lastName(),
    creditOrDebitCardNumber: '4485177968389306',
    cardExpirationDate: '11/2024',
    cardCVV: '123',
    billingAddress: faker.address.streetAddress(),
    zipCode: faker.address.zipCode()
  })
)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const homes = await Promise.all([
    Home.create({
      description:
        'Completely remodeled century old schoolhouse, formerly Hanoverton High School. It is currently used as a rental facility. but can easily be constructed to accommodate an extraordinary home. Oversize, custom built barn doors can also separate the two rooms to accommodate smaller rooms. There is a full kitchen complete with appliances. All new electric on the main floor. A 4 phase gas furnace/ AC unit. Exposed brick walls and beams that take you back to yesteryear. Two custom fireplaces. Endless potential for a truly unique home. Construction upstairs has been started, just waiting for your ideas and finishing touches! The full basement also has potential to be finished- new block walls.',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'public/img/oldhome1.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'Brick n Stone stately home with wrap stone front porch and a stone side porch, a court yard with perennials and arbor as well as a wrap concrete drive. Enter the front double door vestibule into double leaded doors then into the foyer with large open staircase. Home features beautiful original natural woodwork throughout. Off the foyer you enter the parlor with a sun turret room and a stain glassed window. Living room has the original ceramic fireplace and door to side porch. Dining room has beamed ceiling and a built in cabinet with drawers. Breakfast nook and dining room have access to side porch, Den/5th bedroom has a closet and access to the first floor bath.',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'public/img/oldhome2.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        "Restored in 1981 & listed on the National Register of Historic Places, Lawton's Mill (c. 1819-1830) is being offered with its attached shop (c. 1920's) and represents a unique opportunity to own a piece of Rhode Island history! Sited on 0.58 acres within Locust Valley Farm which was created and protected by a renowned RI architect & his wife, the Mill was last used as an architects office but was originally a textile mill. Seeking the next owner with the vision to use the property as a single-family home, professional office, crafts shop, art studio or retail gallery. The Mill (3620sf on 3 floors) needs some updating; the shop (920sf on 2 floors) requires full renovation",
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'public/img/oldhome3.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        "Restored in 1981 & listed on the National Register of Historic Places, Lawton's Mill (c. 1819-1830) is being offered with its attached shop (c. 1920's) and represents a unique opportunity to own a piece of Rhode Island history! Sited on 0.58 acres within Locust Valley Farm which was created and protected by a renowned RI architect & his wife, the Mill was last used as an architect's office but was originally a textile mill. Seeking the next owner with the vision to use the property as a single-family home, professional office, crafts shop, art studio or retail gallery. The Mill (3620sf on 3 floors) needs some updating; the shop (920sf on 2 floors) requires full renovation. Lawton's Mill is one of the few small, early 19th century textile rural mills remaining in RI.",
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'public/img/oldhome4.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'CLASSIC VINTAGE CATSKILL FARMHOUSE on 30 acres bordered by STATE LAND and walking distance to Oquaga State Park with lake and sandy beach. This country home has many improvements including updated electric, updated hot water heating system, full dry basement with cement floor and walk in entrance. The unique character of the house has been lovingly cared for! 3 bedrooms and 2 full bathrooms of which one is complete with a claw foot tub. Many original features.',
      type: 'Old House',
      price: faker.commerce.price(),
      imageUrl: 'public/img/oldhome5.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'In 1889, George Starrett built this Queen Anne-style mansion for his queen, Ann. In recent years, the house — with an eight-sided dome tower, solar calendar and other opulent details — has served as a boutique bed-and-breakfast. But a female manifestation with red hair and a male spirit — believed to be Ann and George — have been spotted on the premises.',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl:
        'https://80v.314.myftpupload.com/wp-content/uploads/2016/10/haunted-house.jpg?time=1605095805',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'When Jim Williams, a local restoration expert, transplanted this home to its current location on St. Julian Street, workers reported odd noises and a tall man dressed in black glaring through a bedroom window. Since, stories of ghostly visions and more have surrounded the late 18th-century house. Some even claim it’s Savannah’s most haunted home.',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl:
        'https://www.dailydot.com/wp-content/uploads/9f4/0b/0432745ad465a0810930e42bc72e5c22-768x384.jpg',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'In 1885, this restored mansion was built for the Allyns, a wealthy farming family. Then on a cold February day in 1913, Mr. Allyn died while reading his afternoon mail in the parlor. Following his death, the property changed hands a few times before becoming a nursing home, furniture store and most recently a bed-and-breakfast. But in 2007, the B&B closed its doors, and the home has been on and off the market since. Some claim it is haunted.',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl:
        'https://theluxuryspot.com/wp-content/uploads/2011/10/Haunted_House_by_AreYoU.jpg',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'In 1980, all eyes were on the Dakota, the Manhattan co-op where John Lennon was murdered. But some say this historic building has had a long history of paranormal activity, and that Lennon himself witnessed the Crying Lady Ghost walking through the halls. Since the music legend’s death, others have reported seeing the ghosts of children wearing turn-of-the-century garb.',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl:
        'https://i.pinimg.com/originals/ac/82/8a/ac828a4c542034e63fed2d8271015fb9.jpg',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'Ghost hunters may want to add this house their list of potentially haunted homes. The listing description hints at the possibility of the 1870 Victorian being haunted, but it might also just be old. “come see for yourself.”',
      type: 'Haunted',
      price: faker.commerce.price(),
      imageUrl:
        'https://ewscripps.brightspotcdn.com/dims4/default/4c3c902/2147483647/strip/true/crop/640x360+0+60/resize/1280x720!/quality/90/?url=https%3A%2F%2Fmediaassets.news5cleveland.com%2Fphoto%2F2018%2F10%2F02%2FClown%20House_1538500820162.jpg_99228188_ver1.0_640_480.jpg',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'This is a unique and amazing one-of-a-kind property in Southern Oregon! Located just a short distance from town, this property offers 120 acres surrounded by mountains! The home offers well-crafted construction and a fully off-grid, solar system.',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'public/img/ecofriendlyhome3.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'State of the art off the grid living with million dollar views on 20 acres just 25 minutes from downtown Taos,NM! 16 inch Pumicecrete walls w/ solar electricity, solar hot water, catchment, community well for TRUE off grid living-NO BILLS, just FRILL',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'public/img/ecofriendlyhome2.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'A picture paints a thousand words, but our tiny house paints so much more.Not pictured in the video are the three custom made cedar boxes that store under the bed, a nice wooden stool, and a very nice antique lamp.These all go with the house.The house can be taken off the wheels and put on a permanent foundation.',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'public/img/ecofriendlyhome1.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        'Steel frame wood studs closed cell foam insulation throughout custom ceiling retractable awning and front deck tankless propane water heater gas stove full-size appliances full-size bathroom two sleeping loss storage throughout.',
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'public/img/ecofriendly4.png',
      status: 'Available',
      inventory: 1
    }),
    Home.create({
      description:
        "Want a starter tiny house? Looking for a camp that's easy to maintain? Want an office space without the overhead? This is the house for you! 20ft long x 8 ft wide x 8ft high converted shipping container with built-in loft that fits queen bed. Plenty of built in storage under the loft allows for full-time living. Large windows and shipping doors that open offer plenty of light at all times of the day with screens to keep you from the bugs.",
      type: 'Eco-friendly',
      price: faker.commerce.price(),
      imageUrl: 'public/img/ecofriendly5.png',
      status: 'Available',
      inventory: 1
    })
  ])

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    paymentInfo.map(payment => {
      return PaymentInfo.create(payment)
    })
  )
  const orders = await Promise.all([
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Pending'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Pending'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Pending'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Pending'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Complete'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Complete'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Complete'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Complete'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Cancelled'
    }),
    Order.create({
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCodeByState()}`,
      orderTotal: faker.commerce.price(),
      orderStatus: 'Cancelled'
    })
  ])

  //console.log(`seeded ${users.length} users`)
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

// const seed = async () => {
//   try {
//     await db.sync({force: true})

//   }
//   catch (err) {
//     console.error(red('Oh noes! Something went wrong!'))
//     console.error(err)
//     db.close()
//   }
// }

// seed();

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

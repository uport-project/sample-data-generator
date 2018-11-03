import program = require('commander')
import EthrDID = require('ethr-did')
import faker = require('faker')

program
  .option("-d, --dids <n>", 'Number of dids', parseInt)
  .parse(process.argv)

const numberOfDids = program.dids || 3

declare interface Profile {
  did: any, // EthrDID object
  firstName: string,
  lastName: string,
  email: string,
  avatar: string,
}

const claimTypes = ['firstName', 'lastName', 'email', 'avatar']

let users: Profile[] = []

for (let x = 0; x < numberOfDids; x++) {
  const keypair = EthrDID.createKeyPair()
  const did = new EthrDID({...keypair})
  users.push({
    did,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar()
  })
}

let promises = []

for (let x = 0; x < numberOfDids; x++) {
  for (let y = 0; y < numberOfDids; y++) {
    for (const claimType in claimTypes) {
      if (claimTypes.hasOwnProperty(claimType)) {
        const type = claimTypes[claimType];
        const claim = {}
        claim[type] = users[y][type]
        promises.push(users[x].did.signJWT({
          sub: users[y].did.did,
          claim
        }))
      }
    }
  }
}

Promise.all(promises).then((jwts) => {
  console.log(jwts)
})


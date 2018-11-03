import program = require('commander')
import EthrDID = require('ethr-did')
import faker = require('faker')
import sqlite3 = require('sqlite3')

program
  .option("--dids <n>", 'Number of dids', parseInt)
  .option("--db <s>", 'Database filename')
  .option("--table <s>", 'Table name')
  .parse(process.argv)

const numberOfDids = program.dids || 3
const dbName = program.db || 'data.sqlite'
const tableName = program.table || 'signed_data'

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
let unsigned = []

// Every user signs all claims about all other users

for (let x = 0; x < numberOfDids; x++) {
  for (let y = 0; y < numberOfDids; y++) {
    for (const claimType in claimTypes) {
      if (claimTypes.hasOwnProperty(claimType)) {
        const type = claimTypes[claimType];
        const claim = {}
        claim[type] = users[y][type]
        const obj = {
          sub: users[y].did.did,
          claim
        }
        promises.push(users[x].did.signJWT(obj))
        unsigned.push({...obj, iss: users[x].did.did})
      }
    }
  }
}

const db = new sqlite3.Database('./' + dbName)

Promise.all(promises).then((jwts) => {
  // console.log(jwts)

  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (iss TEXT, sub TEXT, json_blob TEXT, raw TEXT)`)
    const statement = db.prepare(`INSERT INTO ${tableName} VALUES (?,?,?,?)`)
    
    for (const key in jwts) {
        const jwt = jwts[key]
        const obj = unsigned[key]

        statement.run([obj.iss, obj.sub, JSON.stringify(obj), jwt])
    }

    statement.finalize()

  });
  
  db.close();
})



/// select a.sub, b.key, b.value from signed_data a, json_tree(json_blob) b where b.path = '$.claim';

import program = require('commander')
import EthrDID = require('ethr-did')
import faker = require('faker')
import sqlite3 = require('sqlite3')
import cTable = require('console.table')

program
  .option("--dids <n>", 'Number of dids', parseInt)
  .option("--db <s>", 'Database filename')
  .parse(process.argv)

const numberOfDids = program.dids || 3
const dbName = program.db || 'data.sqlite'

declare interface Profile {
  did: any, // EthrDID object
  firstName: string,
  lastName: string,
  email: string,
  avatar: string,
}

const claimTypes = ['firstName', 'lastName', 'email', 'avatar']

let users: Profile[] = []

console.log('Creating identities...')

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

console.log('Done.')

let promises = []
let unsigned = []


console.log('Signing claims...')

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

console.log('Done.')


const db = new sqlite3.Database('./' + dbName)

Promise.all(promises).then((jwts) => {
  // console.log(jwts)

  db.serialize(function() {
    console.log('Creating tables and views')
    db.run(`CREATE TABLE IF NOT EXISTS signed_data (iss TEXT, sub TEXT, json_blob TEXT, raw TEXT)`)
    db.run(`CREATE INDEX "sub" ON "signed_data" ("sub");`)
    db.run(`CREATE TABLE profile_data (parent_id INTEGER, iss TEXT, sub TEXT, claim_type TEXT, claim_value TEXT);`)
    db.run(`CREATE INDEX "profile_data_sub" ON "profile_data" ("sub");`)
    db.run(`CREATE INDEX "profile_data_claim_type" ON "profile_data" ("claim_type");`)
    db.run(`CREATE TRIGGER insert_profile_data AFTER INSERT ON "signed_data" BEGIN INSERT INTO profile_data select new.rowid, a.iss, a.sub, b.key as claim_type, b.value as claim_value from signed_data a, json_tree(json_blob) b where b.path = '$.claim' and a.rowid = new.rowid; END;`)
    db.run(`CREATE TRIGGER delete_profile_data BEFORE DELETE ON "signed_data" BEGIN DELETE FROM profile_data where parent_id = old.rowid; END;`)
    db.run(`create view  popular_first_name as select * from (
      select sub, claim_value as firstName
      from "profile_data" 
      where claim_type='firstName'
      group by sub, claim_type, claim_value
      order by count( claim_value) asc
      ) group by sub`)

      db.run(`create view  popular_last_name as select * from (
        select sub, claim_value as lastName
        from "profile_data" 
        where claim_type='lastName'
        group by sub, claim_type, claim_value
        order by count( claim_value) asc
      ) group by sub`)
      db.run(`create view popular_avatar as select * from (
        select sub, claim_value as avatar
        from "profile_data" 
        where claim_type='avatar'
        group by sub, claim_type, claim_value
        order by count( claim_value) asc
      ) group by sub`)
      db.run(`create view distinct_dids as select distinct sub from profile_data`)
      db.run(`create view profiles as select distinct_dids.sub, popular_first_name.firstName, popular_last_name.lastName, popular_avatar.avatar
      from distinct_dids
      INNER join 
        popular_first_name on popular_first_name.sub = distinct_dids.sub,
        popular_last_name on popular_last_name.sub = distinct_dids.sub,
        popular_avatar on popular_avatar.sub = distinct_dids.sub`)

    console.log('Done.')
    console.log('Inserting values...')

    const statement = db.prepare(`INSERT INTO signed_data VALUES (?,?,?,?)`)

    for (const key in jwts) {
        const jwt = jwts[key]
        const obj = unsigned[key]

        statement.run([obj.iss, obj.sub, JSON.stringify(obj), jwt])
    }

    statement.finalize()
    console.log('Done.')


    db.all('SELECT count(*) FROM signed_data',[],(err, result) => {
      console.log('\nSELECT count(*) FROM signed_data\n')
      console.log(cTable.getTable(result))
    } )
    .all('SELECT * FROM profiles',[],(err, result) => {
      console.log('SELECT * FROM profiles\n')
      console.log(cTable.getTable(result))
    } )
  
  });

  db.close();
})

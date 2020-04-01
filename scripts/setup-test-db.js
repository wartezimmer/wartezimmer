const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL
})
client.connect()
    .then(() => {
        console.log('Creating test database')
        return client.query("SELECT 'CREATE DATABASE test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test')")
    })
    .then(() => {
        return client.end()
    })
    .catch(err => console.error(err))
  
const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL
})
client.connect().then(() => {
    client.query("SELECT 'CREATE DATABASE mydb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mydb')")
})
  
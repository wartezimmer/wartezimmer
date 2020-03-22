const { Client } = require('pg')

module.exports = async () => { 
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  
  return {
    db: client 
  }
}
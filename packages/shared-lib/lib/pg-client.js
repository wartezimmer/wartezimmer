const { Client } = require('pg')

module.exports = async () => { 
  console.log('DBBBB', process.env.DATABASE_URL)
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  
  return {
    db: client 
  }
}
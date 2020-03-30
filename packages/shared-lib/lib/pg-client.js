const { Client } = require('pg')

module.exports = async (databaseUrl) => { 
  const client = new Client({
    connectionString: databaseUrl || process.env.DATABASE_URL
  })
  await client.connect()
  
  return {
    db: client 
  }
}
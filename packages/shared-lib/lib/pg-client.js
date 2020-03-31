const { Client } = require('pg')

module.exports = async (databaseUrl) => { 
  const dbConnectionString = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL + '?ssl=true' 
    : process.env.DATABASE_URL 
  const client = new Client({
    connectionString: databaseUrl || dbConnectionString
  })
  await client.connect()
  
  return {
    db: client 
  }
}
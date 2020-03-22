const express = require('express')
const pgClient = require('shared-lib/lib/pg-client')

const app = express()

const startup = async () => {
  const { db } = await pgClient()

  app.get('/', (req, res) => {
    res.end('hello wartezimmer admin panel')
  })

  app.listen(process.env.PORT || 3003)
}
startup()
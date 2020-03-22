const express = require('express')
const facility = require("./lib/controllers/facility");
const facilities = require("./lib/controllers/facilities");
const currentQueue = require("./lib/controllers/current_queue");
const { dataQueue } = require('shared-lib/lib/redis-queue')
const pgClient = require('shared-lib/lib/pg-client')

const app = express()

const startup = async () => {
  const { db } = await pgClient()

  app.get('/', (req, res) => {
    res.end('hello wartezimmer')
  })
  app.use("/facility", facility)
  app.use("/facilities", facilities)
  app.use("/current-queue", currentQueue)
  
  app.get('/test1', async (req, res) => {
    const job = await dataQueue.add({ stuff: 'valueee' });
    res.json({ id: job.id });
  })
  
  app.get('/test2', async (req, res) => {
    const result = await db.query('SELECT * FROM test')
    res.json(result.rows)
  })
  
  app.listen(process.env.PORT || 3001)
}
startup()
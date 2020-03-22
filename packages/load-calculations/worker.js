const { dataQueue } = require('shared-lib/lib/redis-queue')
const pgClient = require('shared-lib/lib/pg-client')

const startup = async () => {
  const { db } = await pgClient()

  dataQueue.process(10, async ({ data }) => {
    await db.query('INSERT INTO test(stuff) VALUES($1) RETURNING *', [data.stuff])
  });

  console.log('WARTEZIMMER WORKER RUNNING')
}
startup()
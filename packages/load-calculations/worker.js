const { dataQueue } = require('shared-lib/lib/redis-queue')
const pgClient = require('shared-lib/lib/pg-client')

const { crawlIntensiveCareRegister } = require('./lib/crawl-divi')

DIVI_CRAWL_INTERVAL = 60000 * 30;

const startup = async () => {
  const { db } = await pgClient()
  
  // dataQueue.process(10, async ({ data }) => {
  //   await db.query('INSERT INTO test(stuff) VALUES($1) RETURNING *', [data.stuff])
  // });

  // DIVI CRAWLING
  setInterval(() => {
    crawlIntensiveCareRegister(db);
  }, DIVI_CRAWL_INTERVAL)
  //
}


startup()
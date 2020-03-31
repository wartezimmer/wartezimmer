const { dataQueue } = require('shared-lib/lib/redis-queue')
const knex = require('knex')

const { logger } = require('./lib/logger')
const { crawlIntensiveCareRegister } = require('./lib/crawl-divi')

// TODO: Trigger via exgernal cron job
DIVI_CRAWL_INTERVAL = 60000 * 120;

const startup = async () => {
  const dbConnectionString = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL + '?ssl=true' 
    : process.env.DATABASE_URL 
  const db = knex({
    client: 'pg',
    connection: dbConnectionString,
    acquireConnectionTimeout: 10000,
    log: logger
  })
  
  // Note: Queue usage example
  // dataQueue.process(10, async ({ data }) => {
  //   await db.query('INSERT INTO test(stuff) VALUES($1) RETURNING *', [data.stuff])
  // });

  // DIVI CRAWLING
  runIntensiveCareCrawl(db) // one initial run on startup until there is an externally timed trigger
  setInterval(() => runIntensiveCareCrawl(db), DIVI_CRAWL_INTERVAL)
  //
}
startup()

function runIntensiveCareCrawl(db) {
  try {
    crawlIntensiveCareRegister(db, 'https://www.divi.de/register/intensivregister?list[limit]=0');
  } catch (err) {
    logger.error('Could not crawl data from divi.de intensive care register', err)
  }
}

// knex.js seems to have a broken promise chain somewhere
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}`, reason)
});

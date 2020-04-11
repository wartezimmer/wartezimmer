const { dataQueue } = require('shared-lib/lib/redis-queue')
const knex = require('knex')

const { logger } = require('./lib/logger')
const { crawlIntensiveCareRegister } = require('./lib/crawl-divi')
const { crawlRKICaseNumbers } = require('./lib/crawl-rki-case-numbers')

// TODO: Trigger via exgernal cron job
DIVI_CRAWL_INTERVAL = 60000 * 120;
RKI_CRAWL_INTERVAL = 60000 * 180;

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
  // Note: Deactivated due to divi not freely licensing the data and threatening with consequences
  // runIntensiveCareCrawl(db) // one initial run on startup until there is an externally timed trigger
  // setInterval(() => runIntensiveCareCrawl(db), DIVI_CRAWL_INTERVAL)
  //

  // RKI CRAWLING
  runRKICaseNumbersCrawl(db) // one initial run on startup until there is an externally timed trigger
  setInterval(() => runRKICaseNumbersCrawl(db), RKI_CRAWL_INTERVAL)
}
startup()

function runRKICaseNumbersCrawl(db) {
  try {
    crawlRKICaseNumbers(db, 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=false&outSR=4326&f=json');
  } catch (err) {
    logger.error('Could not crawl case numbers from RKI arcgis API', err)
  }
}

// function runIntensiveCareCrawl(db) {
//   try {
//     crawlIntensiveCareRegister(db, 'https://www.divi.de/register/intensivregister?list[limit]=0');
//   } catch (err) {
//     logger.error('Could not crawl data from divi.de intensive care register', err)
//   }
// }

// knex.js seems to have a broken promise chain somewhere
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}`, reason)
});

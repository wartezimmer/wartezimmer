const fetch = require('node-fetch')
const { logger } = require('./logger')

async function crawlRKICaseNumbers(db, url, extractionRunTime = (new Date()).toUTCString()) {
    const runTimestamp = Date.now();

    const res = await fetch(url);
    const json = await res.json()

    if (!json.features) {
        logger.error(`There are no features in the RKI data`)
    }
    const data = json.features.map(feature => Object.assign(feature.attributes, {
        run_time: extractionRunTime
    }))
    await db('rki_district_case_numbers').insert(data);

    logger.info(`Updated RKI district case numbers with ${data.length} entries`)
}

module.exports = {
    crawlRKICaseNumbers
}
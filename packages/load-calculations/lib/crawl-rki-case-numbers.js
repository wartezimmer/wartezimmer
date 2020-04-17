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
    await db.raw(`
        update rki_district_case_numbers
        set new_cases = (rki_district_case_numbers.cases - b.cases)
        from rki_district_case_numbers as b 
        where rki_district_case_numbers."OBJECTID" = b."OBJECTID"
        and b.run_time = (
            SELECT MAX(c.run_time) 
            FROM rki_district_case_numbers as c
            WHERE c.run_time::date < rki_district_case_numbers.run_time::date
            and c."OBJECTID" = rki_district_case_numbers."OBJECTID"
        )
        and rki_district_case_numbers.run_time = ?
    `, [extractionRunTime])
    
    logger.info(`Updated RKI district case numbers with ${data.length} entries`)
}

module.exports = {
    crawlRKICaseNumbers
}
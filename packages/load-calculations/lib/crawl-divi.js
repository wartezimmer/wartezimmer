const fetch = require('node-fetch')
const { logger } = require('./logger')

async function crawlIntensiveCareRegister(db, url, extractionRunTime) {
    const runTimestamp = Date.now();

    const res = await fetch(url);
    const json = await res.json()
    // const data = extractDataPerClinicFromJson(json, extractionRunTime);
    
    // await db('divi_icu_register').insert(data);

    logger.info(`Updated divi icu register with ${data.length} entries`)
}

const stringToStatus = {
    [null]: 0,
    'VERFUEGBAR': 1,
    'hr-icon-yellow': 2,
    'hr-icon-red': 3
}

function extractDataPerClinicFromHtml(html, extractionRunTime = (new Date()).toUTCString()) {
    const $ = cheerio.load(html, {
        xml: {
            decodeEntities: true
        }
    });
    const rows = [];
    const mapToStatus = (tdElem) => classToStatus[$(tdElem).find('span')[0].attribs.class]
    const columnUniqueKeys = [];
    const dataTable = $('#dataList > tbody > tr').each((trIndex, trElem) => {
        const row = {
            run_time: extractionRunTime,
            address_housenumber: null,
            address_station: null,
        }
        const columns = $(trElem).find('td')
        
        if (columns.length !== 7) {
            throw new Error('The intensive care table columns number changed. Adjust the extraction below where this error is thrown.')
        }

        columns.each((tdIndex, tdElem) => {
            switch(tdIndex) {
                case 0: {
                    const lines = textToSanitizedLines($(tdElem).text())
                    
                    row.name = lines.shift()
                    if (lines.length === 3) {
                        row.address_station = lines.shift()
                    }
                    const streetNum = lines.shift().split(" ")
                    const last = streetNum[streetNum.length - 1]
                    if (/\d+/.test(last)) {
                        row.address_housenumber = streetNum.pop()
                    }
                    row.address_street = streetNum.join(' ').trim()
                    const cityCode = lines.shift()
                    const matches = cityCode.match(/[\d]+/)
                    if (matches[0]) {
                        row.address_postcode = matches[0]
                        row.address_city = cityCode.replace(matches[0], '').trim()
                    }
                    
                    break;
                }
                case 1: {
                    const lines = textToSanitizedLines($(tdElem).text())
                    row.contact_station = lines[0] !== 'Website' ? lines[0] : null
                    const anchor = $(tdElem).find('a')[0]
                    row.contact_website = anchor ? anchor.attribs.href : null

                    break;
                }
                case 2: {
                    row.address_state = $(tdElem).text().trim().toUpperCase()
                    break;
                }
                case 3: {
                    row.icu_low_status = mapToStatus(tdElem)
                    break;
                }
                case 4: {
                    row.icu_high_status = mapToStatus(tdElem)
                    break;
                }
                case 5: {
                    row.ecmo_status = mapToStatus(tdElem)
                    break;
                }
                case 6: {
                    const lines = textToSanitizedLines($(tdElem).text())
                    row.last_update_raw = lines.join(' ')
                    if (row.last_update_raw.length > 16) {
                        console.log('LAST UPDATE > 16', row.last_update_raw)
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        })

        const uniqeKey = [
            row.name,
            row.address_city, 
            row.address_postcode, 
            row.address_station
        ].join(' ')
        const existingKeysCount = columnUniqueKeys.filter(k => (k === uniqeKey)).length
        
        if (existingKeysCount > 0) {
            row.name = `${row.name} (${existingKeysCount + 1})`
        }

        columnUniqueKeys.push(uniqeKey)
        rows.push(row)
    })
    
    return rows
}

module.exports = {
    // extractDataPerClinicFromJson,
    crawlIntensiveCareRegister
}
const cheerio = require('cheerio')
const fetch = require('node-fetch');

const logger = require('./logger')

async function crawlIntensiveCareRegister() {
    const runTimestamp = Date.now();

    try {
        // TODO: fetch
        const data = extractDataPerClinicFromHtml();
    } catch (err) {
        logger.error('Could not crawl data from divi.de intensive care register', err)
    }
}

const classToStatus = {
    'hr-icon-unavailable': 0,
    'hr-icon-green': 1,
    'hr-icon-yellow': 2,
    'hr-icon-red': 3
}

const textToSannitizedLines = (text) => text.split('\r\n')
    .map((l) => l.trim())
    .filter((l) => !!l.length)

function extractDataPerClinicFromHtml(html) {
    const $ = cheerio.load(html, {
        xml: {
            decodeEntities: true
        }
    });
    const rows = [];
    const mapToStatus = (tdElem) => classToStatus[$(tdElem).find('span')[0].attribs.class]
    const dataTable = $('#dataList > tbody > tr').each((trIndex, trElem) => {
        const row = {}
        rows.push(row)
        $(trElem).find('td').each((tdIndex, tdElem) => {
            // console.log(tdIndex, ' ---- ', $(tdElem).html())
            switch(tdIndex) {
                case 0: {
                    const lines = textToSannitizedLines($(tdElem).text())
                    
                    row.name = lines.shift()
                    if (lines.length === 3) {
                        row.address_station = lines.shift()
                    }
                    const streetNum = lines.shift().split(" ")
                    row.address_housenumber = streetNum.pop()
                    row.address_street = streetNum.join(' ').trim()
                    const cityCode = lines.shift().split(" ")
                    row.address_city = cityCode.pop()
                    row.address_postcode = cityCode.join(' ')
                    
                    break;
                }
                case 1: {
                    const lines = textToSannitizedLines($(tdElem).text())
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
                    const lines = textToSannitizedLines($(tdElem).text())
                    row.last_update_raw = lines.join(' ')
                    break;
                }
                default: {
                    break;
                }
            }
        }   )
    })
    
    return rows
}

module.exports = {
    extractDataPerClinicFromHtml,
    crawlIntensiveCareRegister
}
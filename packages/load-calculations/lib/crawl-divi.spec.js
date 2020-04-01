const { readFileSync } = require('fs');
const path = require('path');
const knex = require('knex');
const { logger } = require('./logger')

const { extractDataPerClinicFromHtml, crawlIntensiveCareRegister } = require('./crawl-divi');

describe('Crawl Divi', () => {
    jest.setTimeout(15000)

    let db = null

    beforeAll(async () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
            log: logger,
            acquireConnectionTimeout: 10000,
        })
        
        await db('divi_icu_register').truncate()
    });

    afterAll(async () => {
        db.destroy()
    });

    it('extracts data from html', () => {
        const html = readFileSync(path.resolve(__dirname, '../test/data/https___www.divi.de_register_intensivregister_list[limit]=10.html'))
        const data = extractDataPerClinicFromHtml(html, 'Mon, 30 Mar 2020 09:38:59 GMT');

        expect(data).toMatchSnapshot();
    });

    // TODO: use jest-nock package to mock the request
    // -> currently skipped until mocked 
    it.skip('crawls data from an intensive care url and writes it to db', async () => {
        await crawlIntensiveCareRegister(db, 'https://www.divi.de/register/intensivregister?list[limit]=0', 'Mon, 30 Mar 2020 09:38:59 GMT');

        const dbData = await db('divi_icu_register').select('*')
        const dbDataWithoutCreatedAt = dbData.map((item) => ({ ...item, createdAt: null }))
        
        expect(dbDataWithoutCreatedAt).toMatchSnapshot()
    });
});

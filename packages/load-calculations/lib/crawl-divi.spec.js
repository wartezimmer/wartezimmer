const { extractDataPerClinicFromHtml } = require('./crawl-divi');
const { readFileSync } = require('fs');
const path = require('path');

describe('Crawl Divi', () => {
    it('extracts data from html', () => {
        const html = readFileSync(path.resolve(__dirname, '../test/data/https___www.divi.de_register_intensivregister_list[limit]=10.html'))
        const data = extractDataPerClinicFromHtml(html);

        expect(data).toMatchSnapshot();
    });
});

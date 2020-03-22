const express = require('express')
const path = require('path')
const { ReadableStreamBuffer } = require('stream-buffers')
const csv = require('fast-csv')
const fileUpload = require('express-fileupload')
const pgClient = require('shared-lib/lib/pg-client')

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(fileUpload({
  limits: { 
    fileSize: 10 * 1024 * 1024 
  },
}));

// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)" 
function expand(rowCount, columnCount, startAt=1){
  var index = startAt
  return Array(rowCount).fill(0).map(v => `(${Array(columnCount).fill(0).map(v => `$${index++}`).join(", ")})`).join(", ")
}

// flatten([[1, 2], [3, 4]]) returns [1, 2, 3, 4]
function flatten(arr){
  var newArr = []
  arr.forEach(v => v.forEach(p => newArr.push(p)))
  return newArr
}

const startup = async () => {
  const { db } = await pgClient()

  app.get('/', (req, res) => {
    res.render('index');
  })

  app.get('/update-facilities', (req, res) => {
    res.render('update-facilities', { foo: 'FOO' });
  })

  app.post('/upload-facilities', function(req, res) {
    let chunk = [];
    const chunks = [];
    const fileStream = new ReadableStreamBuffer({
      frequency: 10,
      chunkSize: 2048
    }); 
    fileStream
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        const { 
          X: x,
          Y: y,
          name,
          GlobalID: global_id,
          contact_phone,
          contact_website,
          contact_email,
          address_street,
          address_housenumber,
          address_postcode,
          address_city,
          address_state,
          emergency,
          rooms,
          beds,
          capacity
        } = row;
        const obj = [
          x || 0,
          y || 0,
          name,
          global_id,
          contact_phone,
          contact_website,
          contact_email,
          address_street,
          address_housenumber,
          address_postcode,
          address_city,
          address_state,
          emergency === 'yes',
          rooms || 0,
          beds || 0,
          capacity || 0
        ]
        chunk.push(obj)
        if (chunk.length > 100) {
          chunks.push(chunk)
          chunk = []
        }
      })
      .on('error', error => {
        console.error(error)
        res.end('Facilities Update CSV Parse FAILED.')
      })
      .on('end', async (rowCount) => {
        console.log(`Parsed ${rowCount} rows`)

        for (const batch of chunks) {
          try {
            await db.query(`
              INSERT INTO facilities (
                x,
                y,
                name,
                global_id,
                contact_phone,
                contact_website,
                contact_email,
                address_street,
                address_housenumber,
                address_postcode,
                address_city,
                address_state,
                emergency,
                rooms,
                beds,
                capacity
              ) 
              VALUES ${expand(batch.length, 16)}
            `, flatten(batch))
          } catch (err) {
            console.error(err);
            res.end(`Facilities Update Query FAILED.`)
          }
        }

        res.end('Facilities updated.')
      });
    fileStream.put(req.files.csv.data);
    fileStream.stop();
  });

  app.listen(process.env.PORT || 3003)
}
startup() 
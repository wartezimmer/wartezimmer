const express = require('express')
const path = require('path')
const pgClient = require('shared-lib/lib/pg-client')

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const startup = async () => {
  const { db } = await pgClient()

  app.get('/', (req, res) => {
    res.render('index');
  })

  app.get('/update-facilities', (req, res) => {
    res.render('update-facilities', { foo: 'FOO' });
  })

  app.listen(process.env.PORT || 3003)
}
startup() 
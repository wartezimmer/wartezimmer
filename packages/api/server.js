const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.end('hello wartezimmer')
})

app.listen(process.env.PORT || 3001)
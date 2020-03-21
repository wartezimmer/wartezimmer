const express = require('express')

const app = express()

app.get('/test', (req, res) => {
    res.end('hello wartezimmer')
})

app.listen(process.env.PORT || 3002)
console.log('WARTEZIMMER WORKER RUNNING')
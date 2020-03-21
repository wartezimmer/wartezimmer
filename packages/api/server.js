const facility = require("./lib/controllers/facility");
const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.end('hello wartezimmer')
})

app.use("/facility", facility)

app.listen(process.env.PORT || 3001)
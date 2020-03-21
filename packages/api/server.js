const express = require('express')
const facility = require("./lib/controllers/facility");
const facilities = require("./lib/controllers/facilities");
const currentQueue = require("./lib/controllers/current_queue");
const app = express()

app.get('/', (req, res) => {
    res.end('hello wartezimmer')
})
app.use("/facility", facility)
app.use("/facilities", facilities)
app.use("/current-queue", currentQueue)
app.listen(process.env.PORT || 3001)
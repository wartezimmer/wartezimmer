var express = require('express');
var router = express.Router();

router.post('/:status', (req, res) => {
    var newStatus = req.params["status"]
    // todo
})

router.get("/", (req, res) => {
    // todo
})



module.exports = router;
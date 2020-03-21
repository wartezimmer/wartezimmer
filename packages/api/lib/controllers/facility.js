var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

router.post("/:id/enqueue", (req, res) => {
    var facilityId = req.params["id"]
    // todo
})



module.exports = router;
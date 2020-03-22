import express from "express";

export const facilityRouter = express.Router();

facilityRouter.get('/:id', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

facilityRouter.post("/:id/enqueue", (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

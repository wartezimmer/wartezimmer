import express from "express";

export const currentQueue = express.Router();

currentQueue.post("/:status", (req, res) => {
    var newStatus = req.params["status"];
    // todo
});

currentQueue.get("/", (req, res) => {
    // todo
});

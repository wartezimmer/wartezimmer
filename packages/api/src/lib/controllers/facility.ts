import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export const facilityRouter = express.Router();

facilityRouter.get('/:id', (req, res) => {
    const facilityId = req.params["id"]
    // todo
})

// User is interested in actually enquing, issue JWT
facilityRouter.post("/:id/engage", (req, res) => {
    const facilityId = req.params["id"]
    const token = jwt.sign({
        userId: uuidv4(),
        engagedWithFacility: facilityId,
    }, process.env.JWT_SECRET || 'secret123');
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: 15 * 60 * 1000 })
    res.json({ success: true });
})

facilityRouter.post("/:id/enqueue", (req, res) => {
    const facilityId = req.params["id"]
    // todo 
})

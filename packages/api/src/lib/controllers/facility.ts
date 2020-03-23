import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { pgClient } from "../pg";

export const facilityRouter = express.Router();

facilityRouter.get('/:id', (req, res) => {
    const facilityId = req.params["id"]
    // todo
})

// User is interested in actually enquing, issue JWT
facilityRouter.post("/:id/engage", (req, res) => {
    // TODO: Ensure facility even exists
    // TODO: Track engagement for load calculation (interest in a facility adds to load with a very low factor)
    const facilityId = req.params["id"]
    const token = jwt.sign({
        userId: uuidv4(),
        engagedWithFacility: facilityId,
    }, process.env.JWT_SECRET || 'secret123');
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: 15 * 60 * 1000 })
    res.json({ success: true });
})

facilityRouter.post("/:id/enqueue", async (req, res) => {
    // TODO: Ensure facility even exists
    const facilityId = req.params["id"]
    const authToken = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : null
    
    if (!authToken) {
        res.status(400)
        res.json({ error: 'No engagement token' })
        return
    }

    const authData = jwt.verify(authToken, process.env.JWT_SECRET || 'secret123')
    const db = req.app.get('db')
    const { earliestDeparture, travelTime } = req.body;
    
    await db.query(`
        DELETE FROM queues
        WHERE user_id = $1
    `, [authData.userId])

    const result = await db.query(`
        INSERT INTO queues
        (user_id, facility_id, earliest_departure, travel_time)
        VALUES ($1, $2, to_timestamp($3), $4)
        RETURNING *
    `, [authData.userId, facilityId, earliestDeparture, travelTime])
    const queue = result.rows[0];
    const token = jwt.sign({
        ...authData,
        queueId: queue.id,
        enquedFor: facilityId,
        earliestDeparture,
        travelTime,
    }, process.env.JWT_SECRET || 'secret123');

    res.cookie('Authorization', `Bearer ${token}`, { maxAge: 15 * 60 * 1000 })
    res.json({ success: true });
})

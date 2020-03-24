import express from "express";
import { QUEUE_STATE } from "shared-lib/lib/queue-state.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { verifyJWTAuth } from '../middleware/verify-jwt-auth'
import { TOKEN_LIFETIME } from '../config'
import { asyncHandler } from '../async-handler'

export const facilityRouter = express.Router();

facilityRouter.get('/:id', (req, res) => {
    const facilityId = req.params["id"]
    // todo
})

// User is interested in actually enquing, issue JWT
facilityRouter.post("/:id/engage", (req, res) => {
    // TODO: Ensure facility even exists
    // TODO: Track engagement for load calculation (interest in a facility adds to load with a very low factor)
    // TODO: 
    //   - store ip address and other unique props to identify the same origin (flood prevention if there is no auth)
    //   - if there is a token, and is same facility, ensure there is at least X minutes to last action
    const facilityId = req.params["id"]
    const token = jwt.sign({
        userId: uuidv4(),
        engagedWithFacility: facilityId,
    }, process.env.JWT_SECRET);
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: TOKEN_LIFETIME })
    res.json({ success: true });
})

facilityRouter.post("/:id/enqueue", verifyJWTAuth, asyncHandler(async (req, res) => {
    // TODO: Ensure facility even exists
    // TODO: if there is a token, and is same facility, ensure there is at least X minutes to last action
    // TODO: periodically clean up enqueues that timed out (user never went to facility)
    const facilityId = req.params["id"]
    const db = req.app.get('db')
    const authData = req.authData
    const { earliestDeparture, travelTime } = req.body;
    
    await db.query(`
        DELETE FROM queues
        WHERE user_id = $1
    `, [authData.userId])

    const result = await db.query(`
        INSERT INTO queues
        (user_id, facility_id, earliest_departure, travel_time, state)
        VALUES ($1, $2, to_timestamp($3), $4, $5)
        RETURNING *
    `, [authData.userId, facilityId, earliestDeparture, travelTime, QUEUE_STATE.WAITING])
    const queue = result.rows[0];
    const token = jwt.sign({
        ...authData,
        queueId: queue.id,
        enquedFor: facilityId,
        earliestDeparture,
        travelTime,
        state: QUEUE_STATE.WAITING
    }, process.env.JWT_SECRET);

    res.cookie('Authorization', `Bearer ${token}`, { maxAge: TOKEN_LIFETIME })
    res.json({ success: true });
}))

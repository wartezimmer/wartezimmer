import express from "express";
import jwt from "jsonwebtoken";
import { QUEUE_STATE } from "shared-lib/lib/queue-state.js";
import { verifyJWTAuth } from '../middleware/verify-jwt-auth'
import { verifyQueueToken } from '../middleware/verify-queue-token'
import { TOKEN_LIFETIME } from '../config'
import { asyncHandler } from '../async-handler'

export const currentQueue = express.Router();

currentQueue.post("/cancel", verifyJWTAuth, verifyQueueToken, asyncHandler(async (req, res) => {
    const authData = req.authData

    const db = req.app.get('db')
    const { userId } = authData
    
    await db.query(`
        DELETE FROM queues
        WHERE user_id = $1
    `, [userId])

    const token = jwt.sign({
        userId,
    }, process.env.JWT_SECRET);

    // TODO: recalculate load and waiting time for others in queue
    
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: TOKEN_LIFETIME })
    res.json({ success: true });
}));

currentQueue.post("/arrived", verifyJWTAuth, verifyQueueToken, asyncHandler(async (req, res) => {
    const authData = req.authData

    const db = req.app.get('db')
    const { userId } = authData
    
    await db.query(`
        UPDATE queues
        SET state = $1
        WHERE user_id = $2
    `, [QUEUE_STATE.ARRIVED, userId])

    const token = jwt.sign({
        ...authData,
        state: QUEUE_STATE.ARRIVED
    }, process.env.JWT_SECRET);

    // TODO: recalculate load and waiting time for others in queue
    
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: TOKEN_LIFETIME })
    res.json({ success: true });
}));

currentQueue.get("/", (req, res) => {
    // todo
});

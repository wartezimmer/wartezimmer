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
    
    deleteQueue(db, res, userId)
    res.json({ success: true });
}));

currentQueue.post("/arrived", verifyJWTAuth, verifyQueueToken, asyncHandler(async (req, res) => {
    const authData = req.authData

    const db = req.app.get('db')
    const { userId } = authData
    
    await updateQueueState(db, userId, QUEUE_STATE.ARRIVED)
    setTokenData(res, {
        ...authData,
        state: QUEUE_STATE.ARRIVED
    })
    res.json({ success: true });
}));

currentQueue.post("/processing", verifyJWTAuth, verifyQueueToken, asyncHandler(async (req, res) => {
    const authData = req.authData

    const db = req.app.get('db')
    const { userId } = authData
    
    await updateQueueState(db, userId, QUEUE_STATE.PROCESSING)
    setTokenData(res, {
        ...authData,
        state: QUEUE_STATE.PROCESSING
    })   
    res.json({ success: true });
}));

currentQueue.post("/finished", verifyJWTAuth, verifyQueueToken, asyncHandler(async (req, res) => {
    const authData = req.authData

    const db = req.app.get('db')
    const { userId } = authData
    
    // TODO: Track process(treatment) duration
    deleteQueue(db, res, userId)
    res.json({ success: true });
}));

currentQueue.get("/", (req, res) => {
    // todo
});

async function updateQueueState(db, userId, state) {
    await db.query(`
        UPDATE queues
        SET state = $1
        WHERE user_id = $2
    `, [state, userId])
}

function setTokenData(res, data) {
    const token = jwt.sign(data, process.env.JWT_SECRET);

    // TODO: recalculate load and waiting time for others in queue
    
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: TOKEN_LIFETIME })
}

async function deleteQueue(db, res, userId) {
    await db.query(`
        DELETE FROM queues
        WHERE user_id = $1
    `, [userId])

    setTokenData(res, {
        userId,
    })
}
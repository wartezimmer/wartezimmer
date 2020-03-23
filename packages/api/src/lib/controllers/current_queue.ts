import express from "express";
import jwt from "jsonwebtoken";

export const currentQueue = express.Router();

currentQueue.post("/cancel", async (req, res) => {
    const authToken = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : null
    
    if (!authToken) {
        res.status(400)
        res.json({ error: 'No engagement token' })
        return
    }

    const authData = jwt.verify(authToken, process.env.JWT_SECRET)
    
    if (!authData.queueId) {
        res.status(400)
        res.json({ error: 'No queue token' })
        return
    }

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
    console.log('CANCEL3')
    
    res.cookie('Authorization', `Bearer ${token}`, { maxAge: 15 * 60 * 1000 })
    res.json({ success: true });
});

currentQueue.get("/", (req, res) => {
    // todo
});

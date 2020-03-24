import jwt from "jsonwebtoken";

export function verifyQueueToken (req, res, next) {
  const authData = req.authData

  if (!authData.queueId) {
    res.status(400)
    res.json({ error: 'No queue token' })
    return
  }

  next()
}
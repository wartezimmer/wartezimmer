import jwt from "jsonwebtoken";

export function verifyJWTAuth (req, res, next) {
  const authToken = req.cookies.Authorization ? req.cookies.Authorization.split(' ')[1] : null
    
  if (!authToken) {
    res.status(400)
    res.json({ error: 'No engagement token' })
    return
  }

  const authData:AuthData = jwt.verify(authToken, process.env.JWT_SECRET)
  req.authData = authData

  next()
}

export interface AuthData {
  userId: String
}  
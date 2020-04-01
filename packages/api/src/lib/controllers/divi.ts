import express from "express";
import { asyncHandler } from '../async-handler'
import { logger } from "../logger"

export const diviRouter = express.Router();

// TODO: joi request validation
diviRouter.get("/icu-facilities", asyncHandler(async (req, res) => {
    const db = req.app.get('db');

    const { offset = 0, limit = 100 } = req.query
    const query = db('divi_icu_register')
        .select('*')
        .whereRaw('run_time = (SELECT MAX(run_time) FROM divi_icu_register)')
        .orderBy('id')
        .offset(Math.abs(offset))

    if (limit != 0) {
        query.limit(Math.abs(limit))
    }
    const result = await query

    logger.info(`Fetched ${result.length} divi icu facilities (${offset}, ${limit})`)

    res.json({ success: true, result });
}));

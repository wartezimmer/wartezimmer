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

    res.json({ status: "success", result });
}));

diviRouter.get("/avg-per-state", asyncHandler(async (req, res) => {
    const db = req.app.get('db');
    const result = await db.raw(`
        SELECT 
            address_state, 
            avg(case when icu_low_status > 0 then icu_low_status end) as avg_icu_low, 
            avg(case when icu_high_status > 0 then icu_high_status end) as avg_icu_high, 
            avg(case when ecmo_status > 0 then ecmo_status end) as avg_ecmo
        FROM public.divi_icu_register
        where run_time = (SELECT MAX(run_time) FROM divi_icu_register)
        group by address_state;
    `)

    logger.info(`Fetched divi icu average load per state`)

    res.json({ status: "success", result: result.rows });
}));

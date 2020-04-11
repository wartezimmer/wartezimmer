import express from "express";
import { asyncHandler } from '../async-handler'
import { logger } from "../logger"
import { formatNowMinusDays } from "../formatUTCDate"

export const rkiRouter = express.Router();

// TODO: joi request validation
rkiRouter.get("/rki-district-case-numbers", asyncHandler(async (req, res) => {
    const db = req.app.get('db');
    const { offset = 0, limit = 100, date = formatNowMinusDays(0), fields } = req.query
    
    let parsedDayDate
    try {
        const parsed = new Date(Date.parse(date))
        parsedDayDate = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 23, 59, 59, 999)
    } catch(err) {
        return res.status(400).json({ status: "error", message: "Bad Request: invalid date" })
    }

    // Newest dataset of given day from query.date
    const query = db('rki_district_case_numbers')

    if (fields) {
        const parsedFields = fields.split(',')
        const validatedFields = parsedFields.filter(field => validFields.includes(field))
        if (validatedFields.length === 0) {
            validatedFields.push('OBJECTID')
        }
        query.select(validatedFields)
    } else {
        query.select(['OBJECTID', 'RS'])
    }
        
    query
        .whereRaw(`run_time = (
            SELECT MAX(run_time) 
            FROM rki_district_case_numbers
            WHERE run_time < ?
        )`, [parsedDayDate.toUTCString()])
        .orderBy('id')
        .offset(Math.abs(offset))
        
    if (limit != 0) {
        query.limit(Math.abs(limit))
    }
    const result = await query

    logger.info(`Fetched ${result.length} rki district case numbers (${offset}, ${limit})`)

    res.json({ status: "success", result });
}));

const validFields = [
    "OBJECTID",
    "ADE",
    "GF",
    "BSG",
    "RS",
    "AGS",
    "SDV_RS",
    "GEN",
    "BEZ",
    "IBZ",
    "BEM",
    "NBD",
    "SN_L",
    "SN_R",
    "SN_K",
    "SN_V1",
    "SN_V2",
    "SN_G",
    "FK_S3",
    "NUTS",
    "RS_0",
    "AGS_0",
    "WSK",
    "EWZ",
    "KFL",
    "DEBKG_ID",
    "Shape__Area",
    "Shape__Length",
    "death_rate",
    "cases",
    "deaths",
    "cases_per_100k",
    "cases_per_population",
    "BL",
    "BL_ID",
    "county",
    "last_update",
    "cases7_per_100k",
    "recovered",
]

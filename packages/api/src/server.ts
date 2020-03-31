import express from "express";
import path from "path";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import knex from "knex";

import { currentQueue } from "./lib/controllers/current_queue";
import { facilitiesRouter } from "./lib/controllers/facilities";
import { facilityRouter } from "./lib/controllers/facility";
import { diviRouter } from "./lib/controllers/divi";
import { logger } from "./lib/logger";

const { dataQueue } = require("shared-lib/lib/redis-queue");
const app = express();

app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())

const startup = async () => {
    const dbConnectionString = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL + '?ssl=true' 
    : process.env.DATABASE_URL 
    const db = knex({
        client: 'pg',
        connection: dbConnectionString,
        acquireConnectionTimeout: 10000,
        log: logger
    })
    
    app.set('db', db)

    app.use("/api/facility", facilityRouter);
    app.use("/api/facilities", facilitiesRouter);
    app.use("/api/current-queue", currentQueue);
    app.use("/api/divi", diviRouter)

    // Note Example queue usage (example consumer in packages/load-calculations/worker.js)
    // app.get("/test1", async (req, res) => {
    //     const job = await dataQueue.add({ stuff: "valueee" });
    //     res.json({ id: job.id });
    // });

    // app.get("/test2", async (req, res) => {
    //     const result = await db.query("SELECT * FROM test");
    //     res.json(result.rows);
    // });
    // 

    const staticFileDir = path.resolve(process.cwd(), 'packages/frontend/dist');
    app.get('/*', express.static(staticFileDir))
    
    app.use((err, req, res, next) => {
        logger.error('Request error: ', err)
        res.status(500)
        res.end('Error, sooooorry.')
    })
    app.use((req, res, next) => {
        res.end('Not found.')
    })
    
    app.listen(process.env.PORT || 3001);
};

startup().catch(err => {
    console.error(`startup failed: ${err}`);
});

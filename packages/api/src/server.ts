import express from "express";
import path from "path";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import { currentQueue } from "./lib/controllers/current_queue";
import { facilitiesRouter } from "./lib/controllers/facilities";
import { facilityRouter } from "./lib/controllers/facility";
import { pgClient } from "./lib/pg";

const { dataQueue } = require("shared-lib/lib/redis-queue");
const app = express();

app.use(bodyParser.json())
app.use(cookieParser())

const startup = async () => {
    const db = await pgClient();
    
    app.set('db', db)

    app.use("/api/facility", facilityRouter);
    app.use("/api/facilities", facilitiesRouter);
    app.use("/api/current-queue", currentQueue);

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

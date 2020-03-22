import express from "express";
import path from 'path';
import { currentQueue } from "./lib/controllers/current_queue";
import { facilitiesRouter } from "./lib/controllers/facilities";
import { facilityRouter } from "./lib/controllers/facility";
import { pgClient } from "./lib/pg";

const { dataQueue } = require("shared-lib/lib/redis-queue");
const app = express();

const startup = async () => {
    const db = await pgClient();
    const staticFileDir = path.resolve(process.cwd(), '../../frontend/dist');
    console.log(process.cwd(), staticFileDir)
    app.use(express.static(staticFileDir))

    app.use("/facility", facilityRouter);
    app.use("/facilities", facilitiesRouter);
    app.use("/current-queue", currentQueue);

    app.get("/test1", async (req, res) => {
        const job = await dataQueue.add({ stuff: "valueee" });
        res.json({ id: job.id });
    });

    app.get("/test2", async (req, res) => {
        const result = await db.query("SELECT * FROM test");
        res.json(result.rows);
    });

    app.listen(process.env.PORT || 3001);

    app.use((err, req, res, next) => {
        res.end('Error, sooooorry.')
    })
    app.use((req, res, next) => {
        res.end('Not found.')
    })
};

startup().catch((err) => {
    console.error(`startup failed: ${err}`);
});

import express from "express";

import { currentQueue } from "./lib/controllers/current_queue";
import { facilitiesRouter } from "./lib/controllers/facilities";
import { facilityRouter } from "./lib/controllers/facility";
import { pgClient } from "./lib/pg";

// const { dataQueue } = require("shared-lib/lib/redis-queue");
const app = express();

const startup = async () => {
    const db = await pgClient();

    app.get("/", (req, res) => {
        res.end("hello wartezimmer");
    });
    app.use("/facility", facilityRouter);
    app.use("/facilities", facilitiesRouter);
    app.use("/current-queue", currentQueue);

    app.get("/test1", async (req, res) => {
        // const job = await dataQueue.add({ stuff: "valueee" });
        // res.json({ id: job.id });
    });

    app.get("/test2", async (req, res) => {
        const result = await db.query("SELECT * FROM test");
        res.json(result.rows);
    });

    app.listen(process.env.PORT || 3001);
};

startup().catch((err) => {
    console.error(`startup failed: ${err}`);
});

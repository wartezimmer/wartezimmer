import express from "express";
import path from "path";

import { currentQueue } from "./lib/controllers/current_queue";
import { FACILITIES_NAME_CITY_QUERY, FACILITIES_NEAREST_QUERY } from "./lib/controllers/facilities";
import { facilityRouter } from "./lib/controllers/facility";
import { pgClient } from "./lib/pg";

const { dataQueue } = require("shared-lib/lib/redis-queue");
const app = express();

const startup = async () => {
    const db = await pgClient();
    
    app.use("/facility", facilityRouter);
    // TODO: activate when routes are implemented
    // app.use("/facilities", facilitiesRouter);
    app.use("/current-queue", currentQueue);

    // Example queue usage
    // app.get("/test1", async (req, res) => {
    //     const job = await dataQueue.add({ stuff: "valueee" });
    //     res.json({ id: job.id });
    // });

    // app.get("/test2", async (req, res) => {
    //     const result = await db.query("SELECT * FROM test");
    //     res.json(result.rows);
    // });

    app.get("/facilities/nearest", async (req, res) => {
        console.log(req.query);
        if (req.query.longitude === undefined || req.query.latitude === undefined) {
          res.status(400);
          res.json({error: "latitude or longitude not set"});
          return;
        }

        const latitude = parseFloat(req.query.latitude);
        const longitude = parseFloat(req.query.longitude)

        if (isNaN(latitude) || isNaN(longitude)) {
          res.status(400);
          res.json({error: "latitude or longitude are no valid floats"});
          return;
        }

        const result = await db.query(FACILITIES_NEAREST_QUERY, [latitude, longitude]);
        res.json(result.rows);
        // console.log(result);
    });

    app.get("/api/facilities/search", async (req, res) => {
      if (req.query.q === undefined) {
        res.status(400);
        res.json({error: "q not set"});
        return;
      }

      const result = await db.query(FACILITIES_NAME_CITY_QUERY, [req.query.q]);
      res.json(result.rows);
    });

    const staticFileDir = path.resolve(process.cwd(), 'packages/frontend/dist');
    app.get('/*', express.static(staticFileDir))
    
    app.use((err, req, res, next) => {
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

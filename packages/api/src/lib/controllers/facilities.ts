import express from "express";
import { asyncHandler } from '../async-handler'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

facilitiesRouter.get("/nearest", asyncHandler(async (req, res) => {
	// TODO: Use Joi validation instead of manual if(typecheck)
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

	const db = req.app.get('db')
  	const result = await db.query(FACILITIES_NEAREST_QUERY, [latitude, longitude]);
	
	res.json(result.rows);
}));

// TODO: Paginate with filter: { offset, limit }
facilitiesRouter.get("/search", asyncHandler(async (req, res) => {
  if (!req.query.q) {
    res.status(400);
    res.json({ error: "no query set" });
    return;
  }
  
  const db = req.app.get('db')
  const result = await db.query(FACILITIES_NAME_CITY_QUERY, [req.query.q]);
  
  res.json(result.rows);
}));

export const FACILITIES_NEAREST_QUERY = `
	select
		name,
		object_id,
		address_city,
		earth_distance(ll_to_earth(f.latitude,
		f.longitude),
		ll_to_earth($1,
		$2))
	from
		facilities2 f
	order by
		earth_distance(ll_to_earth(f.latitude,
		f.longitude),
		ll_to_earth($1,
		$2))
	limit 100;
`;

export const FACILITIES_NAME_CITY_QUERY = `
	select
		id,
		name,
		global_id,
		contact_phone,
		contact_website,
		contact_email,
		address_street,
		address_housenumber,
		address_postcode,
		address_city,
		address_state
	from
		facilities
	where
		to_tsvector('german', name || ' ' || address_city || ' ' || address_postcode) @@ plainto_tsquery('german', $1);
`;
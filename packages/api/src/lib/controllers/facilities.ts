import express from "express";
import { asyncHandler } from '../async-handler'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

// Deactivated because unused currently
// facilitiesRouter.get("/nearest", asyncHandler(nearest));
async function nearest(req, res) {
	// TODO: Use Joi validation instead of manual if(typecheck)
	if (req.query.longitude === undefined || req.query.latitude === undefined) {
	  res.status(400);
	  res.json({ status: 'error', code: "latitude or longitude not set"});
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
	
	res.json({ status: 'success', result: result.rows });
}

facilitiesRouter.get("/area", asyncHandler(async (req, res) => {
  const {
    celat,
    celng,
    nelat,
    nelng,
  } = req.query;
  const celatf = parseFloat(celat);
  const celngf = parseFloat(celng);
  const nelatf = parseFloat(nelat);
  const nelngf = parseFloat(nelng);

  if (!celatf || !celngf || !nelatf || !nelngf) {
	  res.status(400);
	  res.json({ status: 'error', code: 'missing_boundary' });
	  return;
	}

  const db = req.app.get('db')
  const result = await db.query(FACILITIES_AREA_QUERY, [celatf, celngf, nelatf, nelngf]);
  
  res.json({ status: 'success', result: result.rows });
}));

// TODO: Paginate with filter: { offset, limit }
facilitiesRouter.get("/search", asyncHandler(async (req, res) => {
  if (!req.query.q) {
    res.status(400);
    res.json({ status: 'error', code: 'no_query' });
    return;
  }
  
  const db = req.app.get('db')
  const result = await db.query(FACILITIES_NAME_CITY_QUERY, [req.query.q]);
  
  res.json({ status: 'success', result: result.rows });
}));

export const FACILITIES_AREA_QUERY = `
  select
    id,
    x,
    y,
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
		facilities f
	where
    earth_box(ll_to_earth($1, $2), earth_distance(ll_to_earth($1, $2), ll_to_earth($3, $4))) @> ll_to_earth(y, x)
	limit 100;
`;

export const FACILITIES_NEAREST_QUERY = `
  select
    id,
    x,
    y,
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
    x,
    y,
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
import express from "express";
import { asyncHandler } from '../async-handler'
import { logger } from '../logger'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

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
  const before = Date.now();
  // TODO: If position known, order by nearest as well
  const result = await db.query(FACILITIES_AREA_QUERY, [
    celatf, 
    celngf, 
    nelatf, 
    nelngf, 
    process.env.AREA_FACILITIES_LIMIT || 250
  ]);
  logger.info(`Area query time: ${Date.now() - before}ms`)

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
  const before = Date.now();
  let result;
  if (req.query.lat && req.query.lng) {
    result = await db.query(FACILITIES_NEAREST_QUERY, [
      req.query.q, 
      req.query.lat, 
      req.query.lng, 
      0 // offset not handled yet
    ]);
  } else {
    result = await db.query(FACILITIES_NAME_CITY_QUERY, [req.query.q]);
  }
  logger.info(`Search query time: ${Date.now() - before}ms`)
  
  res.json({ status: 'success', result: result.rows });
}));

export const FACILITIES_AREA_QUERY = `
  select
    count(id) OVER() AS total,
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
	limit $5;
`;

export const FACILITIES_NEAREST_QUERY = `
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
    address_state,
    earth_distance(ll_to_earth(y, x), ll_to_earth($2, $3)) as distance
	from
		facilities
	where
		to_tsvector('german', name || ' ' || address_city || ' ' || address_postcode) @@ plainto_tsquery('german', $1)
	order by
		distance
  offset $4
	limit 5;
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
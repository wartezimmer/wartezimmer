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
  const result = await db.raw(FACILITIES_AREA_QUERY, {
    celatf, 
    celngf, 
    nelatf, 
    nelngf, 
    limit: process.env.AREA_FACILITIES_LIMIT || 320
  });
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
    result = await db.raw(FACILITIES_NEAREST_QUERY, {
      q: req.query.q, 
      lat: req.query.lat, 
      lng: req.query.lng, 
      offset: 0 // offset not handled yet
    });
  } else {
    result = await db.raw(FACILITIES_NAME_CITY_QUERY, { q: req.query.q });
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
    earth_box(ll_to_earth(:celatf, :celngf), earth_distance(ll_to_earth(:celatf, :celngf), ll_to_earth(:nelatf, :nelngf))) @> ll_to_earth(y, x)
	limit :limit;
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
    earth_distance(ll_to_earth(y, x), ll_to_earth(:lat, :lng)) as distance
	from
		facilities
	where
		to_tsvector('german', name || ' ' || address_city || ' ' || address_postcode) @@ plainto_tsquery('german', :q)
	order by
		distance
  offset :offset
	limit 15;
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
		to_tsvector('german', name || ' ' || address_city || ' ' || address_postcode) @@ plainto_tsquery('german', :q);
`;
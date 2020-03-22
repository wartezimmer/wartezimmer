import express from "express";

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

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
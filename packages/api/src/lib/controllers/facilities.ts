import express from "express";

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', (req, res) => {
    var facilityId = req.params["id"]
    // todo
})

// FIXME adjust column names
// I used different names from a local postgres instance (I did not get admin-panel working)
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
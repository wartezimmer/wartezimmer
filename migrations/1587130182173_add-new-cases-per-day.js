/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('rki_district_case_numbers', {
    new_cases: { 
      type: 'integer',
    },
    case_tendency: { 
      type: 'double',
    },
  })

  pgm.sql(`
    update rki_district_case_numbers
    set new_cases = (rki_district_case_numbers.cases - b.cases)
    from rki_district_case_numbers as b 
    where rki_district_case_numbers."OBJECTID" = b."OBJECTID"
    and b.run_time = (
      SELECT MAX(c.run_time) 
        FROM rki_district_case_numbers as c
        WHERE c.run_time::date < rki_district_case_numbers.run_time::date
        and c."OBJECTID" = rki_district_case_numbers."OBJECTID"
    )
  `)
};

exports.down = pgm => {};

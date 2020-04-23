select (a.cases - b.cases) as new_cases
FROM public.rki_district_case_numbers as a
right join rki_district_case_numbers as b 
	on a."OBJECTID" = b."OBJECTID"
	and b.run_time = (
		SELECT MAX(run_time) 
	    FROM rki_district_case_numbers
	    WHERE run_time::date < a.run_time::date
	)
--where a."OBJECTID" = 2
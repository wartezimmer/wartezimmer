SELECT divi.name, facilities.name, divi.address_postcode as divi_plz, facilities.address_postcode as facilities_plz
FROM public.divi_icu_register as divi
full outer join facilities on similarity(facilities."name", divi."name") > 0.8
and facilities.address_postcode = divi.address_postcode
where divi.run_time = (SELECT MAX(run_time) FROM divi_icu_register)
order by divi.id
;
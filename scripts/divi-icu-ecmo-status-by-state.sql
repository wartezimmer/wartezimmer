SELECT 
	address_state, 
	avg(case when icu_low_status > 0 then icu_low_status end) as avg_icu_low, 
	avg(case when icu_high_status > 0 then icu_high_status end) as avg_icu_high, 
	avg(case when ecmo_status > 0 then ecmo_status end) as avg_ecmo
FROM public.divi_icu_register
where run_time = (SELECT MAX(run_time) FROM divi_icu_register)
group by address_state;
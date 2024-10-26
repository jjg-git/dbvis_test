-- X (genre) Games that belong to X category by release date
SELECT gm.app_id, YEAR(gm.release_date) AS release_year, MONTH(gm.release_date) AS release_month, gn.genre, cat.category
FROM games gm
JOIN categories cat ON gm.app_id = cat.app_id
JOIN genres gn ON gm.app_id = gn.app_id
WHERE gn.genre = 'Action' AND cat.category = 'PvP'
GROUP BY gm.app_id, release_year, release_month, gn.genre, cat.category WITH ROLLUP
ORDER BY release_year DESC, release_month DESC, gm.app_id DESC
LIMIT 100;
/* Games That Support All Platforms (Windows, Mac, Linux) and Have Positive Reviews */
/* Normal Queue */

SELECT g.name
FROM games as g
JOIN platform as p ON g.app_id = p.app_id
WHERE p.windows LIKE "true" AND
	  p.mac LIKE "true" AND
      p.linux LIKE "false"
LIMIT 50;
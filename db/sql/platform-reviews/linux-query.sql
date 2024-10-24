/* Games That Support All Platforms (Windows, Mac, Linux) and Have Positive Reviews */
/* Normal Queue */

SELECT g.name
FROM games as g
JOIN platform as p ON g.app_id = p.app_id
WHERE p.windows LIKE "false" AND
	  p.mac LIKE "false" AND
      p.linux LIKE "true"
LIMIT 50;
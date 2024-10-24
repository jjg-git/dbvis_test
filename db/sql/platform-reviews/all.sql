/* Games That Support All Platforms (Windows, Mac, Linux) and Have Positive Reviews */
/* Normal Queue 
	Duration (sec): 0.373 , 0.387, 0.369, 0.418, 0.365, 0.368, 0.365, 0.382, 0.371, 0.381
*/

SELECT g.name, CASE WHEN p.windows LIKE "true" AND
						 p.mac LIKE "true" AND
						 p.linux LIKE "true" THEN "true"
			   END AS 'All platforms?'
FROM games as g
JOIN platform as p ON g.app_id = p.app_id
WHERE p.windows LIKE "true" AND
	  p.mac LIKE "true" AND
      p.linux LIKE "true";

/* With indexing
	Duration (sec): 0.389, 0.372, 0.402, 0.376, 0.413, 0.368, 0.376, 0.374, 0.367, 0.377
*/

CREATE INDEX idx_game
ON games (name);
CREATE INDEX idx_platforms
ON platform (windows, mac, linux);
  
SELECT g.name, CASE WHEN p.windows LIKE "true" AND
						 p.mac LIKE "true" AND
						 p.linux LIKE "true" THEN "true"
			   END AS 'All platforms?'
FROM games as g
JOIN platform as p ON g.app_id = p.app_id
WHERE p.windows LIKE "true" AND
	  p.mac LIKE "true" AND
      p.linux LIKE "true";

DROP INDEX idx_game
ON games;
DROP INDEX idx_platforms
ON platforms;
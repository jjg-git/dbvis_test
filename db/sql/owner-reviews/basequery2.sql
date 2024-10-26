-- Base Query: Total Estimated Owners and Average Playtime by Genre
SELECT 
    g.genre AS game_genre, 
    SUM(s.estimated_owners) AS total_estimated_owners, 
    AVG(p.average_forever) AS avg_playtime
FROM 
    genres g
JOIN 
    games gm ON g.app_id = gm.app_id
JOIN 
    statistics s ON gm.app_id = s.app_id
JOIN 
    playtime p ON gm.app_id = p.app_id
GROUP BY 
    g.genre
WITH ROLLUP;  -- ROLL-UP: Adds subtotal rows for genres

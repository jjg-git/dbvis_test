-- Version 2: Using Pre-Aggregation
-- Create a Pre-Aggregated Table
CREATE TABLE popular_game_achievements AS
SELECT 
    g.genre, 
    ga.name, 
    s.achievements, 
    s.positive, 
    s.peak_ccu
FROM 
    games ga
JOIN 
    genres g ON ga.app_id = g.app_id
JOIN 
    statistics s ON ga.app_id = s.app_id
WHERE 
    s.positive > 5000  -- DICE: Filter for games with more than 5000 positive reviews
    AND g.genre IN ('Action', 'RPG', 'Strategy');  -- DICE: Focus on specific genres

-- Query Using Pre-Aggregated Data
SELECT * FROM popular_game_achievements
ORDER BY achievements DESC;  -- DRILL-DOWN: Detailed view based on achievements

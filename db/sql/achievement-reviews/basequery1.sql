-- Drill-Down and Dice (Achievements and Popular Games)
-- This query focuses on the number of achievements and the peak concurrent users for popular games (those with over 5000 positive reviews) in specific genres.
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
    g.genre IN ('Action', 'RPG', 'Strategy')  -- DICE: Focus on specific genres
    AND s.positive > 5000  -- DICE: Games with more than 5000 positive reviews
ORDER BY 
    s.achievements DESC;  -- DRILL-DOWN: Detailed view based on achievements

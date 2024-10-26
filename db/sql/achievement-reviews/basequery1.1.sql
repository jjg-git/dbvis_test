-- Version 1: Using Indexing
-- Create Indexes
CREATE INDEX idx_statistics_positive ON statistics (positive);
CREATE INDEX idx_statistics_achievements ON statistics (achievements);
CREATE INDEX idx_genres_app_id ON genres (app_id);

-- Query with Indexing
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

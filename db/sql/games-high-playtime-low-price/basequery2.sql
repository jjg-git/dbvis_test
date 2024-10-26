WITH thresholds AS (
    SELECT 
        AVG(p.average_forever) AS high_playtime_threshold,
        AVG(g.price) AS low_price_threshold
    FROM 
        playtime p
    JOIN 
        games g ON p.app_id = g.app_id
)
SELECT 
    g.name, 
    p.average_forever, 
    g.price, 
    RANK() OVER (ORDER BY p.average_forever DESC) AS playtime_rank,
    RANK() OVER (ORDER BY g.price ASC) AS price_rank
FROM 
    games g
JOIN 
    playtime p ON g.app_id = p.app_id
CROSS JOIN 
    thresholds t
WHERE 
    p.average_forever > t.high_playtime_threshold 
    AND g.price < t.low_price_threshold
ORDER BY 
    playtime_rank, price_rank;

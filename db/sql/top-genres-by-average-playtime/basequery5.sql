SELECT 
    g.genre, 
    ROUND(AVG(p.average_forever), 2) AS avg_playtime, 
    RANK() OVER (ORDER BY AVG(p.average_forever) DESC) AS genre_rank
FROM 
    genres g
JOIN 
    playtime p ON g.app_id = p.app_id
GROUP BY 
    g.genre
ORDER BY 
    avg_playtime DESC;

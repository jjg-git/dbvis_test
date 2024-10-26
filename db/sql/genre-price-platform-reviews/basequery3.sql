-- Indie Games with Price Under 20 that Support at Least 2 Platforms
SELECT DISTINCT gm.app_id, gm.name, gn.genre, gm.price, pf.windows, pf.mac, pf.linux,
       (SUM(CASE WHEN pf.windows = 'True' THEN 1 ELSE 0 END) +
        SUM(CASE WHEN pf.mac = 'True' THEN 1 ELSE 0 END) +
        SUM(CASE WHEN pf.linux = 'True' THEN 1 ELSE 0 END)) AS platform_count
FROM games gm
JOIN platform pf ON gm.app_id = pf.app_id
JOIN genres gn ON gm.app_id = gn.app_id
AND gm.price > 10
AND gm.price < 20
WHERE gn.genre = 'Strategy'
GROUP BY gm.app_id, gm.name, gn.genre, gm.price, pf.windows, pf.mac, pf.linux
HAVING platform_count >= 2
LIMIT 100;

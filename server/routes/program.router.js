const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for program stats leader board
 */
router.get('/', (req, res) => {
    const queryText = `SELECT team_id, player.last_name, player.jersey_number,  ROUND(AVG(points),2) AS "avg_points",
    TO_CHAR(AVG(assists),'fm99D00') AS "avg_assists", TO_CHAR(AVG(rebounds),'fm99D00') AS "avg_rebounds",
    TO_CHAR(AVG(steals),'fm99D00') AS "avg_steals"
    FROM player
    JOIN player_stats
    ON player.id = player_stats.player_id
    GROUP BY player.id
    ORDER BY avg_points DESC;`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing Program Stats in Program router:', error);
            res.sendStatus(500);
        });
});


module.exports = router;
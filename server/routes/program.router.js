const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for program stats leader board
 */
router.get('/', (req, res) => {
    const queryText = `SELECT team_id, player.last_name, player.jersey_number,  AVG(points) AS "avg_points", AVG(assists) AS "avg_assists", AVG(rebounds) AS "avg_rebounds", AVG(steals) AS "avg_steals" FROM player
    JOIN player_stats
    ON player.id = player_stats.player_id
    GROUP BY player.id;`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing Program Stats in Program router:', error);
            res.sendStatus(500);
        });
});


module.exports = router;
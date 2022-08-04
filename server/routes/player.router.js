const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log('req.user.id', req.user.id);
    const queryText = `SELECT games.opponent_name, games.date,
    points, assists, rebounds, steals
    FROM "player_stats"
    JOIN games
    ON games.id = player_stats.game_id
    JOIN "player"
    ON player.id = player_stats.id
    WHERE player.user_id = $1;`;
    pool
        .query(queryText, [req.user.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing Player Stats in Player router:', error);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

// TODO- ADD PUT to update scores

module.exports = router;
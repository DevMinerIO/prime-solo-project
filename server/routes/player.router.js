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
    const queryText = `SELECT player.team_id, player.id, player_stats.game_id, games.opponent_name, games.date,
    points, assists, rebounds, steals, jersey_number, last_name
    FROM "player_stats"
    JOIN games
    ON games.id = player_stats.game_id
    JOIN "player"
    ON player.id = player_stats.player_id
    WHERE player.user_id = $1
    ORDER BY date;`;
    pool
        .query(queryText, [req.user.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing Player Stats in Player router:', error);
            res.sendStatus(500);
        });
});

// GET FOR LAST GAME ID /lastId
router.get('/lastId/:teamId/:playerID', (req, res) => {
    // GET route code here
    const teamId = req.params.teamId;
    const playerId = req.params.playerID;
    console.log('req.user.id', req.user.id);
    const queryText = `SELECT games.id FROM games 
    WHERE team_id = ${teamId} AND games.id > (SELECT MAX(player_stats.game_id)
    FROM player_stats 
    WHERE player_stats.player_id = ${playerId}) ORDER BY games.id LIMIT 1;
`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error with User Id in Player router:', error);
            res.sendStatus(500);
        });
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    console.log('req.body is: ', req.body);
    const stats = req.body

    const queryText = `INSERT INTO "player_stats" (points, assists, rebounds, steals, game_id, player_id )
    VALUES($1,$2,$3,$4,$5,$6);`;
    pool.query(queryText, [stats.points, stats.assists, stats.rebounds, stats.steals, req.body.nextGameId, req.body.playerId])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('AY! error POSTing to db', error);
            res.sendStatus(500)
        })

});

// TODO- ADD PUT to update scores
router.put('/:playerId/:gameId', (req, res) => {
    const newStats = req.body;
    console.log('req.body in update is:', newStats);
    const queryText = `UPDATE player_stats 
    SET points = $1, assists = $2, rebounds =$3,
    steals = $4
    WHERE game_id = $5 AND player_id = $6;`;
    pool.query(queryText, [newStats.points, newStats.assists, newStats.rebounds, newStats.steals, newStats.game_id, newStats.playerId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });

})

module.exports = router;
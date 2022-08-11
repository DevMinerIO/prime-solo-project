const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Default get route on players side on login. Will show individual player_stats
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log('req.user.id', req.user.id);
    const queryText = `SELECT player.team_id, player.id, player_stats.game_id, games.opponent_name, TO_CHAR(games.date,'MM/DD/YYYY'),
    points, assists, rebounds, steals, jersey_number, last_name
    FROM "player_stats"
    JOIN games
    ON games.id = player_stats.game_id
    JOIN "player"
    ON player.id = player_stats.player_id
    WHERE player.user_id = $1
    ORDER BY games.date;`;
    pool
        .query(queryText, [req.user.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing Player Stats in Player router:', error);
            res.sendStatus(500);
        });
});

// GET FOR LAST GAME ID /lastId
// Needed for the player to be able to add new game. Where game id for their team is larger then their current max game_id
router.get('/lastId/:teamId/:playerID', (req, res) => {
    // GET route code here
    const teamId = req.params.teamId;
    const playerId = req.params.playerID;
    console.log('req.user.id', req.user.id);
    const queryText = `SELECT games.id FROM games 
    WHERE team_id = $1 AND games.id > (SELECT MAX(player_stats.game_id)
    FROM player_stats 
    WHERE player_stats.player_id = $2) ORDER BY games.id LIMIT 1;
`;
    pool
        .query(queryText, [teamId, playerId ])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error with User Id in Player router:', error);
            res.sendStatus(500);
        });
});

// Get all players stats for the team stats table in player view. 
router.get('/team/:teamId', (req, res) => {
    const teamId = Number(req.params.teamId);
    console.log('team id in /team/:teamId is:', teamId);
    const queryText = `SELECT player.id, player.first_name, player.last_name,player.jersey_number,
    TO_CHAR(AVG(points), 'fm99D00') AS "avg_points", TO_CHAR(AVG(assists), 'fm99D00') AS "avg_assists", TO_CHAR(AVG(rebounds),
    'fm99D00') AS "avg_rebounds", TO_CHAR(AVG(steals), 'fm99D00') AS "avg_steals"
    FROM player_stats
    JOIN games
    ON games.id = player_stats.game_id
    JOIN player
    ON player.id = player_stats.player_id
    WHERE player.team_id = $1
    GROUP BY player.id
    ORDER BY avg_points DESC;`;
    pool
        .query(queryText, [teamId])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing TEAM Stats in Player router /team/:teamId', error);
            res.sendStatus(500);
        });
}) 
// get router for accordion table in coach-view
router.get('/:gameId/:teamId', (req, res) => {
    const teamId = req.params.teamId;
    const gameId = req.params.gameId;
    const queryText = `SELECt player.jersey_number, player.first_name, player.last_name, points, assists, rebounds, steals
    FROM player
    JOIN player_stats
    ON player.id = player_stats.player_id
    WHERE team_id = $1 AND game_id = $2
    ORDER BY points DESC;`
    pool
        .query(queryText, [teamId, gameId])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing TEAM Stats in Player router /team/:teamId', error);
            res.sendStatus(500);
        });
})


/**
 * POST route for adding new player_stats from player view
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

// TODO- ADD PUT to update scores on player-view side
router.put('/:playerId', (req, res) => {
    const newStats = req.body;
    const playerId = req.params.playerId;
    console.log('req.body in update is:', newStats);
    const queryText = `UPDATE player_stats 
    SET points = $1, assists = $2, rebounds =$3,
    steals = $4
    WHERE game_id = $5 AND player_id = $6;`;
    pool.query(queryText, [Number(newStats.points), Number(newStats.assists), Number(newStats.rebounds), Number(newStats.steals),
    newStats.game_id, playerId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        });

})

module.exports = router;
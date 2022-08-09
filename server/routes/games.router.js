const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const queryText = `SELECT games.team_id, games.opponent_name, games.date, games.points_for, games.points_against, games.outcome  FROM games
    JOIN team
    ON team.id = games.team_id
    JOIN player
    ON player.team_id = team.id
    WHERE  player.user_id = $1;`;
    pool
        .query(queryText, [req.user.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error GETing TEAM info in games router:', error);
            res.sendStatus(500);
        });
});
/**
 * GET route connected with games.reducer /api/games/${action.payload.teamId}
 */
// router.get('/:teamId', (req, res) => {
//     const teamId = req.params.teamId;
//     console.log('teamId req.params is:', teamId);
//     const queryText =`SELECT * FROM "games"
//     WHERE team_id = $1;`;
//     pool
//         .query(queryText, [teamId])
//         .then((results) => res.send(results.rows))
//         .catch((error) => {
//             console.log('Error GETing Player Stats in games router:', error);
//             res.sendStatus(500);
//         });
// });

/**
 * POST route for adding game to "games" table
 */
router.post('/', (req, res) => {
    console.log('req.body is: ', req.body);
    const newGame = req.body;
    const queryText = `INSERT INTO "games" (team_id, opponent_name, date, points_for, 
        points_against, outcome)
    VALUES($1,$2,$3,$4,$5,$6);`;
    pool.query(queryText, [newGame.team_id, newGame.opponent_name, newGame.date,
    newGame.points_for, newGame.points_against, newGame.outcome])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('AY! error POSTing NEW GAME to db in "games" router', error);
            res.sendStatus(500)
        })

});

module.exports = router;
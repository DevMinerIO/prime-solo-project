const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  console.log('first name is!!!!!', firstName);

  // adding new user into "user" table
  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
  // When player first_name and last_name are equal set "id" 
  // have to use WITH clause because Update cant directly take in Max();
  const queryTextPlayer = `
    WITH maxId(currentMax) as (
    SELECT MAX(id) FROM "user")
    UPDATE "player" 
    SET "user_id" = maxId.currentMax
    FROM maxId
    WHERE UPPER("first_name") = UPPER($1) AND UPPER("last_name") = UPPER($2);`;
  pool
    // TODO maybe add this query above and add a .then so it avoids a potential timing issue?
    .query(queryTextPlayer, [firstName, lastName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Failed at registration update player: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;

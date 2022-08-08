const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
// Miner added player router
const playerRouter = require('./routes/player.router');
// router for program leaderboard
const programRouter = require('./routes/program.router');
// router for coachesView to add and read games from "games" table
const scheduleRouter = require('./routes/games.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
// /api/user Handles user Authentication: login/log out, registration
app.use('/api/user', userRouter);
// Miner added player route
app.use('/api/player', playerRouter);
// for the program leaderboard. In ProgramView
app.use('/api/program', programRouter);
// for games/ schedule table
app.use('/api/games', scheduleRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

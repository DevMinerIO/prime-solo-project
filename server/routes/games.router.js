const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route for adding game to "games" table
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
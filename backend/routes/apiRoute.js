const express = require('express');
require('dotenv').config({ path: './backend/config/.env' });
// Middleware
const githubAuth = require('../middleware/githubAuth');
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');

const router = express.Router();
// Auth middleware
router.use(githubAuth);

// @ GET        user's info
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    req.requestWithAuth(`GET /users/${req.params.login}`)
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        all languages
// @ access     PUBLIC
router.get('/langs/:login',
    selectRepos,
    updateReposWithLangs,
    sumLangs,
    (req, res) => {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({
            langs: req.langs,
            repos: req.repos
        });
});

module.exports = router;
const express = require('express');
const { Octokit } = require('@octokit/rest');
require('dotenv').config({ path: './mockupBackend/config/.env' });
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');

const router = express.Router();
const octokit = new Octokit({ auth: process.env.AUTH_TOKEN });

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    octokit
        .request(`GET /users/${req.params.login}`)
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        all languages
// @ access     PUBLIC
router.get('/langs/:login', selectRepos, updateReposWithLangs, sumLangs, (req, res) => {
    try {
        res.status(200).json({
            langs: req.langs,
            repos: req.repos
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
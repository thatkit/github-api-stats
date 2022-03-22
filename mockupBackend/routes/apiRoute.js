const express = require('express');
const fetch = require('cross-fetch');
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');

const router = express.Router();

// reusable logic block
const githubApiEndpoint = 'https://api.github.com';
// # API rate limit error handler

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}`)
        .then(result => result.text())
        .then(data => {
            res.status(200).json(JSON.parse(data));
        })
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
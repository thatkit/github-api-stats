const express = require('express');
const fetch = require('cross-fetch');
const reposSelector = require('../middleware/reposSelectorMW');
const langsAggregator = require('../middleware/langsAggregatorMW');

const router = express.Router();

// reusable logic block
const githubApiEndpoint = 'https://api.github.com';
// # fetcher
// # API rate limit error handler

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}`)
        .then(result => result.text())
        .then(data => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(JSON.parse(data));
        })
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        user's repos
// @ access     PUBLIC
router.get('/repos/:login', (req, res) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}/repos`)
        .then(result => result.text())
        .then(data => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(JSON.parse(data));
        })
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        repo's languages
// @ access     PUBLIC
router.get('/langs/:login/:repo', (req, res) => {
    fetch(`${githubApiEndpoint}/repos/${req.params.login}/${req.params.repo}/languages`)
        .then(result => result.text())
        .then(data => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(JSON.parse(data));
        })
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        all languages
// @ access     PUBLIC
router.get('/langstest/:login', reposSelector, langsAggregator, (req, res) => {
    console.log(req.selectedRepos)

});

module.exports = router;
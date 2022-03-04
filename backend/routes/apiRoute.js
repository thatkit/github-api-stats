const express = require('express');
const fetch = require('cross-fetch');

const router = express.Router();

const githubApiEndpoint = 'https://api.github.com';

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}`)
        .then(result => result.text())
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        user's repos
// @ access     PUBLIC
router.get('/repos/:login', (req, res) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}/repos`)
        .then(result => result.text())
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        repo's languages
// @ access     PUBLIC
router.get('/langs/:login/:repo', (req, res) => {
    fetch(`${githubApiEndpoint}/repos/${req.params.login}/${req.params.repo}/languages`)
        .then(result => result.text())
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(err => console.log(err)); // # error handler needed
});

module.exports = router;
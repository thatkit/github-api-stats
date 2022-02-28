const express = require('express');
const fetch = require('cross-fetch');

const router = express.Router();

const githubApiEndpoint = 'https://api.github.com';

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user', (req, res) => {
    fetch(`${githubApiEndpoint}/users/thatkit`)
        .then(result => result.text())
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        user's repos
// @ access     PUBLIC
router.get('/repos', (req, res) => {
    fetch(`${githubApiEndpoint}/users/thatkit/repos`)
        .then(result => result.text())
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(err => console.log(err)); // # error handler needed
});

// @ GET        repo's languages
// @ access     PUBLIC
router.get('/langs', (req, res) => {
    fetch(`${githubApiEndpoint}/repos/thatkit/xpense-tracker/languages`)
        .then(result => result.text())
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(err => console.log(err)); // # error handler needed
});

module.exports = router;
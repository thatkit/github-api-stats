const express = require('express');
const fetch = require('cross-fetch');

const router = express.Router();

// reusable logic blocks
const githubApiEndpoint = 'https://api.github.com';
const fetcher = (req, res, modifiedEndpoint) => {
    fetch(modifiedEndpoint)
        .then(result => result.text())
        .then(data => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(JSON.parse(data));
        })
        .catch(err => console.log(err)); // # error handler needed
}

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    fetcher(req, res, `${githubApiEndpoint}/users/${req.params.login}`);
});

// @ GET        user's repos
// @ access     PUBLIC
router.get('/repos/:login', (req, res) => {
    fetcher(req, res, `${githubApiEndpoint}/users/${req.params.login}/repos`);
});

// @ GET        repo's languages
// @ access     PUBLIC
router.get('/langs/:login/:repo', (req, res) => {
    fetcher(req, res, `${githubApiEndpoint}/repos/${req.params.login}/${req.params.repo}/languages`);
});

module.exports = router;
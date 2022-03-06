const express = require('express');
const fetch = require('cross-fetch');

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
router.get('/langstest/:login', (req, res) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}/repos`)
        // (1) Convert to a string
        .then(result => result.text())
        // (2) Select only necessary properties
        .then(data => {
            const parsedData = JSON.parse(data);
            console.log(parsedData)
            return parsedData.map(repo => ({
                name: repo.name,
                desc: repo.description,
                url: repo.url,
                topics: repo.topics
            }));
        })
        // (3) Adding languages data
        .then(data => {
            const langs = {};

            const repos = data.map(repo => {
                fetch(`${githubApiEndpoint}/repos/${req.params.login}/${repo.name}/languages`)
                    .then(result => result.text())
                    .then(langs => {
                        const parsedLangs = JSON.parse(langs);
                        return {
                            ...repo,
                            langs: parsedLangs
                        }
                    })
            });

            console.log(repos)

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(repos);
        })
        .catch(err => console.log(err)); // # error handler needed
});

module.exports = router;
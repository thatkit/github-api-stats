const express = require('express');
const { Octokit } = require('@octokit/core');
const { request } = require('@octokit/request');
const { createAppAuth  } = require('@octokit/auth-app');
require('dotenv').config({ path: './mockupBackend/config/.env' });
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');

const router = express.Router();

const auth = createAppAuth({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    installationId: 24432550
});
let token = '';
auth({ type: 'installation' }).then(data => {
    token = data.token;
})
const octokit = new Octokit();

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    octokit.request(`GET /users/${req.params.login}`, {
            headers: { authorization: `token ${token}` },
            org: 'thatkit-org',
            type: 'installation'
        })
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
const express = require('express');
let { request } = require('@octokit/request');
const { createAppAuth  } = require('@octokit/auth-app');
require('dotenv').config({ path: './backend/config/.env' });
// Middleware
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');

const router = express.Router();

// Auth middleware config
const auth = createAppAuth({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    installationId: process.env.INSTALLATION_ID
});

router.use((req, res, next) => {
    auth({ type: 'installation' }).then(({ token }) => {
        request = request.defaults({
            headers: { authorization: `token ${token}` },
            org: 'thatkit-org',
            type: 'installation'
        });
        next();
    });
});

// @ GET        name, location, bio, etc.
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    request(`GET /users/${req.params.login}`)
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
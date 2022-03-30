const express = require('express');
require('dotenv').config({ path: './backend/config/.env' });
const { createAppAuth  } = require('@octokit/auth-app');
const { request } = require('@octokit/request');
const customRequest = request.defaults({
    org: process.env.ORG,
    type: 'installation'
});
// Middleware
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');

const router = express.Router();

// @ POST       auth token
// @ access     PUBLIC
router.post('/auth', (req, res) => {
    const auth = createAppAuth({
        appId: process.env.APP_ID,
        privateKey: process.env.PRIVATE_KEY,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        installationId: process.env.INSTALLATION_ID
    });
    
    auth({ type: 'installation' })
        .then(({ token }) => res.status(200).json({ token }))
        .catch(err => console.log(err)); // # error handler
});

// @ GET        user's info
// @ access     PUBLIC
router.get('/user/:login', (req, res) => {
    customRequest(`GET /users/${req.params.login}`, {
        headers: {authorization: `token ${req.headers.token}`}
    })
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
        res.status(200).json({
            langs: req.langs,
            repos: req.repos
        });
});

module.exports = router;
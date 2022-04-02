const express = require('express');
require('dotenv').config({ path: './backend/config/.env' });
// Github API
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

// @ GET        auth token
// @ access     PUBLIC
router.get('/auth', (req, res) => {
    console.log({ 
        path: '/auth',
        tokenHeader: req.headers.token
    }) // # data / error log
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
    console.log({ 
        path: `/user/${req.params.login}`,
        tokenHeader: req.headers.token
    }) // # data / error log
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
        console.log({ 
            path: `/langs/${req.params.login}`,
            tokenHeader: req.headers.token
        }) // # data / error log
            res.status(200).json({
            langs: req.langs,
            repos: req.repos
        });
});

module.exports = router;
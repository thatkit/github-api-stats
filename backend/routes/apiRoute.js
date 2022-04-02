const express = require('express');
require('dotenv').config({ path: './backend/config/.env' });
// Middleware
const selectRepos = require('../middleware/selectRepos');
const updateReposWithLangs = require('../middleware/updateReposWithLangs');
const sumLangs = require('../middleware/sumLangs');
// Controllers
const {
    getAuth,
    getUser,
    getLangs
} = require('../controllers/apiControllers');

const router = express.Router();

router.get('/auth', getAuth);
router.get('/user/:login', getUser);
router.get('/langs/:login',
    selectRepos,
    updateReposWithLangs,
    sumLangs,
    getLangs
);

module.exports = router;
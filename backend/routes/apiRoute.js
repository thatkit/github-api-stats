const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET request to /api');
    res.status(200).json({ mes: 'successful GET request to /api' });
});

module.exports = router;
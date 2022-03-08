const fetch = require('cross-fetch');
// reusable logic block
const githubApiEndpoint = 'https://api.github.com';

const sumLangs = (req, res, next) => {
    console.log(req.langsArr);
    next();
}

module.exports = sumLangs;
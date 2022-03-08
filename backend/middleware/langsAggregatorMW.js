const fetch = require('cross-fetch');
// reusable logic block
const githubApiEndpoint = 'https://api.github.com';

const langsAggregator = (req, res, next) => {
    req.selectedRepos.map((repo, index) => {

        return {
            ...repo,
            index
        }
    });
    console.log(req.selectedRepos)
    next();
}

module.exports = langsAggregator;
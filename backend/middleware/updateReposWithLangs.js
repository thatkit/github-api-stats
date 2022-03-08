const fetch = require('cross-fetch');
// reusable logic block
const githubApiEndpoint = 'https://api.github.com';

const updateReposWithLangs = (req, res, next) => {
    // (1) Updaiting each repo with langs property
    const reposPromise = req.repos.map(repo => {
        return new Promise((resolve, reject) => {
            fetch(`${githubApiEndpoint}/repos/${req.params.login}/${repo.name}/languages`)
                .then(result => result.text())
                .then(result => JSON.parse(result))
                .then(langs => resolve({
                    ...repo,
                    langs
                }))
                .catch(err => reject(err)); // # error handler needed
        });
    });
    // (2) Waiting for all repos to get updated with langs,
    // AND assigning repos & langs array data to request
    Promise
        .all(reposPromise)
        .then(repos => {
            req.repos = repos;
            req.langsArr = [];
            repos.forEach(repo => req.langsArr.push(repo.langs))
            next();
        })
        .catch(err => console.log(err)); // # error handler needed;
}

module.exports = updateReposWithLangs;
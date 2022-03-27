const { request } = require('@octokit/request');
const customRequest = request.defaults({
    org: process.env.ORG,
    type: 'installation'
});

const updateReposWithLangs = (req, res, next) => {
    console.log('2', 'updaterepos')
    // (1) Updaiting each repo with langs property
    const reposPromise = req.repos.map(repo => {
        return new Promise((resolve, reject) => {
            customRequest(`GET /repos/${req.params.login}/${repo.name}/languages`, {
                headers: {authorization: `token ${req.headers.token}`}
            })
                .then(({ data }) => {
                    resolve({
                        ...repo,
                        langs: data
                    })
                })
                .catch(err => reject(err)); // # error handler needed
        });
    });
    // (2) Waiting for all repos to get updated with langs,
    // AND assigning repos & langs array data to request
    Promise
        .all(reposPromise)
        .then(repos => {
            req.repos = repos;
            req.langs = [];
            repos.forEach(repo => req.langs.push(repo.langs))
            next();
        })
        .catch(err => console.log(err)); // # error handler needed;
}

module.exports = updateReposWithLangs;
const { request } = require('@octokit/request');
const customRequest = request.defaults({
    org: process.env.ORG,
    type: 'installation'
});

const selectRepos = (req, res, next) => {
    customRequest(`GET /users/${req.params.login}/repos`, {
        headers: {authorization: `token ${req.headers.token}`}
    })
        .then(({ data }) => {
            const repos = data.map(repo => ({
                name: repo.name,
                desc: repo.description,
                url: repo.url,
                topics: repo.topics
            }));

            req.repos = repos;
            next();
        })
        .catch(err => console.log(err)); // # error handler needed
}

module.exports = selectRepos;
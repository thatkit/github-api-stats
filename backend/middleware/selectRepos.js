const { request } = require('@octokit/request');
const customRequest = request.defaults({
    org: process.env.ORG,
    type: 'installation'
});

const selectRepos = (req, res, next) => {
    customRequest(`GET /users/${req.params.login}/repos`, {
        headers: { authorization: `token ${req.headers.token}` }
    })
        .then(({ data }) => {
            const repos = data
                .filter(({ owner }) => owner.login === req.params.login)
                .map((repo, index) => ({
                    name: repo.name,
                    desc: repo.description,
                    githubUrl: repo.html_url,
                    topics: repo.topics,
                    index
                }));

            req.repos = repos;
            next();
        })
        .catch(err => console.log(err)); // # error handler needed
}

module.exports = selectRepos;
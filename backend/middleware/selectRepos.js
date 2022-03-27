const selectRepos = (req, res, next) => {
    console.log('1', 'selectrepos')
    req.requestWithAuth(`GET /users/${req.params.login}/repos`)
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
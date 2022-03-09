const fetch = require('cross-fetch');
// reusable logic block
const githubApiEndpoint = 'https://api.github.com';

const selectRepos = (req, res, next) => {
    fetch(`${githubApiEndpoint}/users/${req.params.login}/repos`)
        // (1) Convert to a string
        .then(result => result.text())
        // (2) Select only necessary properties
        .then(data => {
            let parsedData = JSON.parse(data);
            if (!Array.isArray(parsedData)) throw new Error(parsedData.message);

            parsedData = parsedData.slice(0, 2);
            const repos = parsedData.map(repo => ({
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
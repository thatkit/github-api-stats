const reposJson = require('../db/repos.json');

const selectRepos = (req, res, next) => {
    try {
        let parsedData = JSON.parse(JSON.stringify(reposJson));
        if (!Array.isArray(parsedData)) throw new Error(parsedData.message);

        parsedData = parsedData.slice(0, 15);
        const repos = parsedData.map(repo => ({
            name: repo.name,
            desc: repo.description,
            url: repo.url,
            topics: repo.topics
        }));

        req.repos = repos;
        next();
    } catch(err) {console.log(err)} // # error handler needed
}

module.exports = selectRepos;
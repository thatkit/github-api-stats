const langsJson = require('../db/langs.json');

const updateReposWithLangs = (req, res, next) => {
    try {
        let parsedLangs = JSON.parse(JSON.stringify(langsJson));

        const modifiedRepos = req.repos.map(repo => {
            let parsedRepo = JSON.parse(JSON.stringify(repo));
    
            const langs = parsedLangs[parsedRepo.name];
            console.log({
                ...parsedRepo,
                langs
            })
            return {
                ...parsedRepo,
                langs
            }
        });

        req.repos = modifiedRepos;
        next();
    } catch(err) {
        res.status(404).json(err);
    }
}

module.exports = updateReposWithLangs;
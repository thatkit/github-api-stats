const langsJson = require('../db/langs.json');

const updateReposWithLangs = (req, res, next) => {
    try {
        let parsedLangs = JSON.parse(JSON.stringify(langsJson));

        req.langs = [];

        const modifiedRepos = req.repos.map((repo, i) => {
            const parsedRepo = JSON.parse(JSON.stringify(repo));
            const langs = parsedLangs.filter(({ name }) => name === parsedRepo.name)[0].langs;

            req.langs.push(langs);

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
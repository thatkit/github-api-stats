const fetch = require('cross-fetch');
// reusable logic block
const githubApiEndpoint = 'https://api.github.com';

const sumLangs = (req, res, next) => {
    // Reduces array of langs objects to one object

    const langsObj = {};
    // Main loop
    req.langs.forEach(langsItem => {
        // Sub-loop
        Object.entries(langsItem).forEach(lang => {
            Object.keys(langsObj).includes(lang[0])
                ? langsObj[lang[0]] += lang[1]
                : langsObj[lang[0]] = lang[1];
        });
    });

    req.langs = langsObj;
    next();
}

module.exports = sumLangs;
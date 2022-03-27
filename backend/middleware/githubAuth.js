const { createAppAuth  } = require('@octokit/auth-app');
const { request } = require('@octokit/request')

const auth = createAppAuth({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    installationId: process.env.INSTALLATION_ID
});

const githubAuth = (req, res, next) => {
    auth({ type: 'installation' })
        .then(({ token }) => {
            const requestWithAuth = request.defaults({
                headers: { authorization: `token ${token}` },
                org: process.env.ORG,
                type: 'installation'
            });
            req.requestWithAuth = requestWithAuth;
            next();
        })
        .catch(err => console.log(err)); // # error handler
}

module.exports = githubAuth;
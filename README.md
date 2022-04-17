# Github user's stats

## App description

This apps enables inspection of a Github user's basic stats (name, location, icon image) including a **chart of all the languages the user has applied** as well as corresponding repos. 

The app uses Github's REST API via Octokit client. At the moment of posting this README, the auth strategy is [Github App installation](https://github.com/octokit/authentication-strategies.js/#github-app-or-installation-authentication) in order to acquire the highest API requests limit per hour.

## Usage

It is simple. Just insert a username and observe the stats and the chart.

## Tags (techs)

 - Backend: NodeJS, ExpressJS, [@octokit/auth-app](https://github.com/octokit/auth-app.js), [@octokit/request](https://github.com/octokit/request.js);
 - Frontend: ReactJS, Redux Toolkit (RTKQ), reactstrap, [Chart.js](https://www.chartjs.org/).
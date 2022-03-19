import { createContext } from 'react';
import styles from './Layout.module.css';

// test
// static
// data

const user = {
    login: 'thatkit',
    avatar_url: 'https://avatars.githubusercontent.com/u/47465581?v=4',
    location: 'Vladivostok, Russia'
}

const langsAndRepos = {
    langs: {
        JavaScript: 3824,
        HTML: 7134,
        CSS: 930
    },
    repos: [
        {
            name: "ca-a-react-app",
            desc: "How to create a React app Codecademy tutorial",
            url: "https://api.github.com/repos/thatkit/ca-a-react-app",
            topics: [],
            langs: {
                JavaScript: 1877,
                HTML: 1721,
                CSS: 930
            }
        },
        {
            name: "ca-adhoc",
            desc: "Codecademy Adhoc repo",
            url: "https://api.github.com/repos/thatkit/ca-adhoc",
            topics: [],
            langs: {
                HTML: 5413,
                JavaScript: 1947
            }
        }
    ]
}

export const UserContext = createContext(user);
export const LangsAndReposContext = createContext(langsAndRepos);

export const Layout = ({ children }) => {
    return (
        <UserContext.Provider value={user}>
            <LangsAndReposContext.Provider value={langsAndRepos}>
                <div className={styles.layout}>{children}</div>
            </LangsAndReposContext.Provider>
        </UserContext.Provider>
    );
}
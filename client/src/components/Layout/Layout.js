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
    repos: [],
    langs: {
        HTML: 25,
        CSS: 30,
        JavaScript: 45,
        Ruby: 11,
        Sass: 15
    }
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
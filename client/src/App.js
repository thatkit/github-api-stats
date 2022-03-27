import styles from './App.module.css';
import { PieChart } from './components/PieChart/PieChart';
import { Search } from './components/Search/Search';
import { Header } from './components/Header/Header';
import { Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import {
  useGetAuthTokenQuery,
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiService';
import { Footer } from './components/Footer/Footer';
import { setCookie } from './helpers/cookies';

const App = () => {
  const [login, setLogin] = useState('thatkit'); // #
  const [skipQuery, setSkipQuery] = useState(false); // #

  // QUERY for general user's info
  const {
    data: token,
    error: tokenError, // # error displaying ?
    isSuccess: isTokenOk
  } = useGetAuthTokenQuery();
  
  // QUERY for auth token
  const {
    data: user,
    error: userError, // # error displaying ?
    isSuccess: isUserFound
  } = useGetUserByLoginQuery(login, {
    skip: skipQuery
  });

  // QUERY for repos and langs
  const {
    data: langsAndRepos,
    error: langsError, // # error displaying ?
    isSuccess: areLangsAndReposLoaded
  } = useGetLangsByLoginQuery(login, {
    skip: skipQuery
  });

  // Search field event handlers
  const handleOnChange = ({ target }) => {
    setSkipQuery(true);
    setLogin(target.value);
  }
  const handleOnClick = () => setSkipQuery(false);

  useEffect(() => {
    console.log(token)
    token && setCookie('token', token.token);
  }, [token]);

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <Container className={styles.layout}>
        <Search
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
        />
        {(isUserFound && areLangsAndReposLoaded) && (
          <>
            <Header user={user} />
            <PieChart user={user} langs={langsAndRepos.langs} repos={langsAndRepos.repos} />
          </>
        )}
        <Footer />
    </Container>
  );
}

export default App;
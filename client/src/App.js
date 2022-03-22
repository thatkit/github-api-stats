import styles from './App.module.css';
import { PieChart } from './components/PieChart/PieChart';
import { Search } from './components/Search/Search';
import { Header } from './components/Header/Header';
import { Container } from 'reactstrap';
import { useState } from 'react';
import {
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiService';
import { Footer } from './components/Footer/Footer';

const App = () => {
  const [login, setLogin] = useState('thatkit'); // #
  const [skipQuery, setSkipQuery] = useState(false); // #
  
  // QUERY for general user's info
  const {
    data: user,
    error: userError, // # error displaying ? # message of API rate limit
    isSuccess: isUserFound
  } = useGetUserByLoginQuery(login, {
    skip: skipQuery
  });

  // QUERY for repos and langs
  const {
    data: langsAndRepos,
    error: langsError, // # error displaying ? # message of API rate limit
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

  return (
    <Container className={styles.layout}>
        <Search
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
        />
        {isUserFound && (
          <>
            <Header user={user} />
            <PieChart user={user} langsAndRepos={langsAndRepos} />
          </>
        )}
        <Footer />
    </Container>
  );
}

export default App;
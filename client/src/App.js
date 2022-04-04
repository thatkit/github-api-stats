// Styles
import styles from './App.module.css';
import { Container } from 'reactstrap';
// Components
import { AuthHOC } from './components/AuthHOC/AuthHOC';
import { PieChart } from './components/PieChart/PieChart';
import { PieChartPlaceholder } from './components/PieChart/PieChartPlaceholder/PieChartPlaceholder';
import { Search } from './components/Search/Search';
import { Header } from './components/Header/Header';
import { HeaderPlaceholder } from './components/Header/HeaderPlaceholder/HeaderPlaceholder';
import { Footer } from './components/Footer/Footer';
// React
import { useState } from 'react';
// Redux
import {
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiService';

const App = () => {
  const [login, setLogin] = useState('');
  const [skipQuery, setSkipQuery] = useState(true);

  // QUERY for user info
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
  const handleOnClick = () => {
    setSkipQuery(false);
  };

  return (
    <AuthHOC>
      <Container className={styles.layout}>
          <Search
            handleOnChange={handleOnChange}
            handleOnClick={handleOnClick}
          />
          {(isUserFound && areLangsAndReposLoaded)
            ? (<>
                <Header user={user.data} />
                <PieChart user={user.data} langs={langsAndRepos.langs} repos={langsAndRepos.repos} />
              </>)
            : (<>
                <HeaderPlaceholder />
                <PieChartPlaceholder />
              </>)
          }
          <Footer />
      </Container>
    </AuthHOC>
  );
}

export default App;
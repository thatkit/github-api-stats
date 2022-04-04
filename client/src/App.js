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
import { useEffect, useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
import {
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiService';

const App = () => {
  const [skipQuery, setSkipQuery] = useState(true);

  // Redux input state
  const login = useSelector(({ inputSlice }) => inputSlice.login);

  // QUERY for user info
  const {
    data: user,
    error: userError, // # error displaying ?
    isSuccess: isUserFound,
  } = useGetUserByLoginQuery(login, {
    skip: skipQuery
  });

  // QUERY for repos and langs
  const {
    data: langsAndRepos,
    error: langsError, // # error displaying ?
    isSuccess: areLangsAndReposLoaded,
  } = useGetLangsByLoginQuery(login, {
    skip: skipQuery
  });

  const handleOnClick = () => {
    setSkipQuery(false);
  };

  return (
    <AuthHOC>
      <Container className={styles.layout}>
          <Search
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
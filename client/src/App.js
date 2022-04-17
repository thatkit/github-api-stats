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
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  useLazyGetUserByLoginQuery,
  useLazyGetLangsByLoginQuery
} from './redux/apiService';
import { updateErrorMes } from './redux/inputSlice';
import { useEffect } from 'react';
import { LoadingBar } from './components/LoadingBar/LoadingBar';

const App = () => {
  // Redux input state
  const login = useSelector(({ inputSlice }) => inputSlice.login);

  // Lazy Query for user info
  const [
    getUserByLogin,
    {
      data: userData,
      isSuccess: isUserSuccess,
      isFetching: isUserFetching,
      isError, error
    }
  ] = useLazyGetUserByLoginQuery();
  
  // Lazy Query for repos and langs
  const [
    getLangsByLogin,
    {
      data: langsAndReposData,
      isSuccess: areLangsAndReposSuccess,
      isFetching: areLangsAndReposSuccessFetching
    }
  ] = useLazyGetLangsByLoginQuery();

  // Dispatch queries
  const handleOnClick = () => {
    if (login) {
      getUserByLogin(login, true);
      getLangsByLogin(login, true);
      return null;
    }
  }

  // Error message update
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      dispatch(updateErrorMes(error.data.response.data.message));
    }
  }, [dispatch, isError, error]);

  return (
    <AuthHOC>
      <Container className={styles.layout}>
          {(isUserFetching || areLangsAndReposSuccessFetching) && <LoadingBar />}
          <Search
            handleOnClick={handleOnClick}
          />
          {(isUserSuccess && areLangsAndReposSuccess)
            ? (<>
                <Header user={userData.data} />
                <PieChart
                  user={userData.data}
                  langs={langsAndReposData.langs}
                  repos={langsAndReposData.repos} 
                />
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
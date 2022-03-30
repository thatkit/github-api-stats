import styles from './App.module.css';
import { PieChart } from './components/PieChart/PieChart';
import { Search } from './components/Search/Search';
import { Header } from './components/Header/Header';
import { Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import {
  useGetAuthTokenMutation,
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiService';
import { Footer } from './components/Footer/Footer';
import { setCookie } from './helpers/cookies';
import { useDispatch } from 'react-redux';
import { storeAuthToken } from './redux/authSlice';

const App = () => {
  const [login, setLogin] = useState('thatkit'); // #
  const [skipQuery, setSkipQuery] = useState(false); // #

  // QUERY for general user's info
  // const {
  //   data: token,
  //   error: tokenError, // # error displaying ?
  //   isSuccess: isTokenOk
  // } = useGetAuthTokenMutation();
  
  const [getAuth, auth] = useGetAuthTokenMutation();
  useEffect(() => getAuth(), []);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(auth);
    auth.status === 'fulfilled' && dispatch(storeAuthToken(auth.data.token));
  }, [auth]);
  
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

  // useEffect(() => token && setCookie('token', token.token), [token]);
  // # token is renewed every rerender which is a waste

  return (
    <Container className={styles.layout}>
        <Search
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
        />
        {(isUserFound && areLangsAndReposLoaded) && (
          <>
            <Header user={user.data} />
            <PieChart user={user.data} langs={langsAndRepos.langs} repos={langsAndRepos.repos} />
          </>
        )}
        <Footer />
    </Container>
  );
}

export default App;
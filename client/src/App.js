import styles from './App.module.css';
import { PieChart } from './components/PieChart/PieChart';
import { Search } from './components/Search/Search';
import { Layout } from './components/Layout/Layout';
import { Header } from './components/Header/Header';
import { Container } from 'reactstrap';
import { useState } from 'react';
import {
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiSlice';
import { Footer } from './components/Footer/Footer';

const App = () => {

  const isUserFound = true;

  // dynamic
  // data
  // logic

  const [login, setLogin] = useState('thatkit'); // #
  const [skipQuery, setSkipQuery] = useState(false); // #
  
  // // QUERY for general user's info
  // const {
  //   data: user,
  //   error: userError, // # error displaying ? # messae of API rate limit
  //   isSuccess: isUserFound
  // } = useGetUserByLoginQuery(login, {
  //   skip: skipQuery
  // });
  // // const isUserFound = true;

  // // QUERY for general user's info
  // const {
  //   data: langsAndRepos,
  //   error: langsError, // # error displaying ? # messae of API rate limit
  //   isSuccess: areLangsAndReposLoaded
  // } = useGetLangsByLoginQuery(login, {
  //   skip: skipQuery
  // });

  // console.log(langsAndRepos)

  // Search field event handlers
  const handleOnChange = ({ target }) => {
    setSkipQuery(true);
    setLogin(target.value);
  }
  const handleOnClick = () => setSkipQuery(false);

  return (
    <Container className={styles.container}>
      <Search
        className={styles.top}
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
      />
      {/* {isUserFound && <UserCard
        className={styles.mid}
        user={user}
        langsAndRepos={langsAndRepos}
      />} */}
      {isUserFound && (
        <Layout>
          <Header />
          <PieChart />
        </Layout>
      )}
      <Footer className={styles.bot}/>
    </Container>
  );
}

export default App;
import styles from './App.module.css';
import { UserCard } from './components/UserCard/UserCard';
import { Search } from './components/Search/Search';
import { Container } from 'reactstrap';
import { useState } from 'react';
import {
  useGetUserByLoginQuery,
  useGetLangsByLoginQuery
} from './redux/apiSlice';
import { Footer } from './components/Footer/Footer';

const App = () => {
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
      {isUserFound && <UserCard
        className={styles.mid}
        user={user}
        langsAndRepos={langsAndRepos}
      />}
      <Footer className={styles.bot}/>
    </Container>
  );
}

export default App;
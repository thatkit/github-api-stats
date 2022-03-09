import './App.css';
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
  const isUserFound = true;

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
    <Container style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Search 
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
      />
      {isUserFound && <UserCard
        // user={user} 
        // langsAndRepos={langsAndRepos}
      />}
      <Footer />
    </Container>
  );
}

export default App;
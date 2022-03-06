import './App.css';
import { UserCard } from './components/UserCard/UserCard';
import { Search } from './components/Search/Search';
import { Container } from 'reactstrap';
import { useState } from 'react';
import { useGetUserByLoginQuery } from './redux/apiSlice';

const App = () => {
  const [login, setLogin] = useState('');
  const [skipQuery, setSkipQuery] = useState(true);
  
  const {
    data: user,
    error,
    isSuccess
  } = useGetUserByLoginQuery(login, {
    skip: skipQuery
  });

  console.log(error)
  
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
      {isSuccess && <UserCard user={user} />}
    </Container>
  );
}

export default App;
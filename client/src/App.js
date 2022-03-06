import './App.css';
import { UserCard } from './components/UserCard/UserCard';
import { Search } from './components/Search/Search';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const isUserFound = false;

  const result = useSelector(({ api }) => api.queries);
  
  useEffect(() => {
    console.log(result)
    
  }, [result]);

  return (
    <Container style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {isUserFound ? <UserCard /> : <Search />}
    </Container>
  );
}

export default App;
import './App.css';
import { UserCard } from './components/UserCard/UserCard';
import { Search } from './components/Search/Search';
import {
  Container
} from 'reactstrap';

const App = () => {
  const isUserFound = false;

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
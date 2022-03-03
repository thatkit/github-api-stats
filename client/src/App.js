import './App.css';
import { UserCard } from './components/UserCard/UserCard';
import {
  Container
} from 'reactstrap';

const App = () => {
  return (
    <Container style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
      <UserCard />
    </Container>
  );
}

export default App;
import Navbar from './components/Navbar.jsx';
import Characters from './screens/Characters.jsx';
import Home from './screens/Home.jsx';
import CreateCharacter from './screens/CreateCharacter.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/add-character' element={<CreateCharacter />} />
      </Routes>
    </>
  );
}

export default App;

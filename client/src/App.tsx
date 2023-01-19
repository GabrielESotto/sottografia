import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Individual from './pages/Individual';
import Services from './pages/Services';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
      <Route path='/individual' element={<Individual />} />
    </Routes>
  );
}

export default App;

import Style from './App.module.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import CreateVideogame from './components/createVideogame/CreateVideogame';
import LandingPage from './components/landingPage/LandingPage';
import VideogameDetail from './components/videogameDetail/VideogameDetail';

function App() {

  return (
    <div className={Style.container}>
      <Routes>        
        <Route path='/' element={<LandingPage />} />
        <Route path='/videogamedetail/:id' element={[<Navbar />, <VideogameDetail />]} />
        <Route path='/home' element={[ <Navbar />, <Home />]} />
        <Route path='/createVideogame' element={[<Navbar />, <CreateVideogame />]} />
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;

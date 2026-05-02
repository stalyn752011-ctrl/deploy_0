import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sessions from './pages/Sessions';
import Profile from './pages/Profile';
import Map from './pages/Map';
import HolaStalyn from './pages/HolaStalyn';
import Landing from './pages/Landing';
import SubidaCursos from './pages/SubidaCursos';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/map" element={<Map />} />
            <Route path="/hola-stalyn" element={<HolaStalyn />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/subida-cursos" element={<SubidaCursos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

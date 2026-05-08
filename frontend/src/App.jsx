import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ApuntesPdf from './pages/ApuntesPdf';
import VerApuntesPdf from './pages/VerApuntesPdf';
import VerCursos from './pages/VerCursos';
import Notifications from './pages/Notifications';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isVerCursos = location.pathname === '/ver-cursos' || location.pathname === '/ver-apuntes-pdf';
  return (
    <div className="App">
      <Navbar />
      <main className={isVerCursos ? '' : 'app-main'}>
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
          <Route path="/apuntes-pdf" element={<ApuntesPdf />} />
          <Route path="/ver-apuntes-pdf" element={<VerApuntesPdf />} />
          <Route path="/ver-cursos" element={<VerCursos />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

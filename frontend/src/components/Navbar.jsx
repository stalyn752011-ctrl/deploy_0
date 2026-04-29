import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/sessions');
    }
  };

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link className="brand" to="/"><span className="logo">✨</span><span className="brand-text">Growly</span></Link>

        <div className="search-wrap">
          <input
            id="global-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={onSearchKeyDown}
            placeholder="Buscar cocina, programación, guitarra, fotografía..."
            aria-label="Buscar sesiones"
          />
        </div>

        <nav className="main-nav"> 
          {/* Aquí irán los links principales de navegación */}
        </nav>

        <div className="actions">
          <button className="icon-btn bell" aria-label="Notificaciones">🔔<span className="badge">5</span></button>
          <div className="avatar-wrap">
            <button id="avatarBtn" className="avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>TU</button>
            <div id="avatarMenu" className={`avatar-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
              <Link to="/profile">Mi Perfil</Link>
              <a href="#">Configuración</a>
              <a href="#">Mis Logros</a>
              <hr />
              <a href="#">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
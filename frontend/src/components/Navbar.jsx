import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const initials = user ? user.nombre.charAt(0).toUpperCase() : 'TU';

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
          <Link to="/landing">Landing</Link>
          <Link to="/subida-cursos">Subir Curso</Link>
          <Link to="/ver-cursos">Ver Cursos</Link>
        </nav>

        <div className="actions">
          <Link to="/notifications" className="icon-btn bell" aria-label="Notificaciones">🔔</Link>
          <Link to="/profile" className="avatar-btn avatar-link">{initials}</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
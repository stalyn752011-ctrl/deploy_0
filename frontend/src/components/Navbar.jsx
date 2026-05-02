import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
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
          <Link to="/landing">Landing</Link>
          <Link to="/subida-cursos">Subir Curso</Link>
          <Link to="/hola-stalyn">Hola Stalyn</Link>
        </nav>

        <div className="actions">
          <button className="icon-btn bell" aria-label="Notificaciones">🔔<span className="badge">5</span></button>
          <Link to="/profile" className="avatar-btn avatar-link">TU</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
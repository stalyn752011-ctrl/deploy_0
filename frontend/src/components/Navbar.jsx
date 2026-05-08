import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const initials = user ? user.nombre.charAt(0).toUpperCase() : 'TU';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/sessions');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/login');
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
          <Link to="/apuntes-pdf">Subir Notas</Link>
          <Link to="/ver-apuntes-pdf">Ver Notas</Link>
          <Link to="/ver-cursos">Ver Cursos</Link>
        </nav>

        <div className="actions" ref={menuRef}>
          <Link to="/notifications" className="icon-btn bell" aria-label="Notificaciones">🔔</Link>
          <div className="avatar-wrap">
            <button
              className="avatar-btn avatar-link"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Menú de usuario"
              aria-expanded={menuOpen}
            >
              {initials}
            </button>
            <div className={`avatar-menu${menuOpen ? ' open' : ''}`}>
              <button className="avatar-menu-btn" onClick={() => { navigate('/profile'); setMenuOpen(false); }}>Mis Datos</button>
              <button className="avatar-menu-btn" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
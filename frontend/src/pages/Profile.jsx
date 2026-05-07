import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { API } from '../api';

function Profile() {
  const [activeNav, setActiveNav] = useState('my-courses');
  const [formData, setFormData] = useState({ nombre: '', email: '', language: 'en' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(stored);

    fetch(API.user(user.email))
      .then(res => res.json())
      .then(data => {
        setFormData({ nombre: data.nombre, email: data.email, language: data.language || 'en' });
      })
      .catch(() => {
        setFormData({ nombre: user.nombre, email: user.email, language: user.language || 'en' });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const stored = localStorage.getItem('user');
    if (!stored) return;
    const user = JSON.parse(stored);

    try {
      const response = await fetch(API.user(user.email), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({ nombre: data.nombre, email: data.email, language: data.language }));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      setFormData({ nombre: user.nombre, email: user.email, language: user.language || 'en' });
    }
    setSaved(false);
  };

  const initials = formData.nombre ? formData.nombre.charAt(0).toUpperCase() : '?';

  const navItems = [
    { id: 'my-courses', label: 'My Courses', icon: '📚' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' },
  ];

  if (loading) return <main className="profile-dashboard"><p>Loading...</p></main>;

  return (
    <main className="profile-dashboard">
      <aside className="profile-sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <span className="sidebar-name">{formData.nombre}</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-link ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <Link to="/subida-cursos" className="sidebar-link upload-link">
            <span className="sidebar-icon">🎬</span>
            Upload Video
          </Link>
        </nav>
      </aside>

      <section className="profile-main">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Welcome back, {formData.nombre}</h2>
          </div>

          <div className="profile-avatar-section">
            <div className="profile-avatar">{initials}</div>
            <span className="profile-badge">Student</span>
          </div>

          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="nombre">Username</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
            </div>

            <a href="#" className="change-password-link">Change password</a>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className={`btn-save ${saved ? 'saved' : ''}`}>
                {saved ? '✓ Saved!' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Profile;

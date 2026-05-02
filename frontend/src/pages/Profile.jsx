import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [activeNav, setActiveNav] = useState('my-courses');
  const initialData = {
    username: 'GrowlyUser',
    email: 'user@growly.com',
    language: 'en',
  };
  const [formData, setFormData] = useState(initialData);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setSaved(false);
  };

  const navItems = [
    { id: 'my-courses', label: 'My Courses', icon: '📚' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' },
  ];

  return (
    <main className="profile-dashboard">
      <aside className="profile-sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">GU</div>
          <span className="sidebar-name">GrowlyUser</span>
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
            <h2>Welcome back, GrowlyUser</h2>
          </div>

          <div className="profile-avatar-section">
            <div className="profile-avatar">GU</div>
            <span className="profile-badge">Student</span>
          </div>

          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
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

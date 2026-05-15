import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { API } from '../api';

function Profile() {
  const [activeNav, setActiveNav] = useState('my-courses');
  const [formData, setFormData] = useState({ nombre: '', email: '', language: 'en' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [myPdfs, setMyPdfs] = useState([]);
  const [pdfsLoading, setPdfsLoading] = useState(false);

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

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    const user = JSON.parse(stored);

    setCoursesLoading(true);
    fetch(`${API.cursosList}?author_email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setMyCourses(data))
      .catch(() => setMyCourses([]))
      .finally(() => setCoursesLoading(false));

    setPdfsLoading(true);
    fetch(`${API.apuntesPdfList}?author_email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setMyPdfs(data))
      .catch(() => setMyPdfs([]))
      .finally(() => setPdfsLoading(false));
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

  const handleDeleteCourse = async (courseID) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(API.cursoDetail(courseID), { method: 'DELETE' });
      if (res.ok) {
        setMyCourses(prev => prev.filter(c => c.courseID !== courseID));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleDeletePdf = async (id) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) return;
    try {
      const res = await fetch(API.apuntesPdfDetail(id), { method: 'DELETE' });
      if (res.ok) {
        setMyPdfs(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
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

          <div className="my-courses-section">
            <h3>My Uploaded Courses</h3>
            {coursesLoading ? (
              <p className="courses-loading">Loading courses...</p>
            ) : myCourses.length === 0 ? (
              <p className="courses-empty">No courses uploaded yet.</p>
            ) : (
              <div className="courses-list">
                {myCourses.map(course => (
                  <div key={course.courseID} className="course-item">
                    <div className="course-info">
                      <span className="course-name">{course.name}</span>
                      <span className="course-category">{course.category}</span>
                      <span className={`course-status status-${course.status}`}>{course.status}</span>
                    </div>
                    {course.video_url && (
                      <video src={course.video_url} className="course-thumb" muted preload="metadata" />
                    )}
                    <button
                      className="course-delete-btn"
                      onClick={() => handleDeleteCourse(course.courseID)}
                      title="Delete course"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <h3 style={{ marginTop: '32px' }}>My Uploaded PDFs</h3>
            {pdfsLoading ? (
              <p className="courses-loading">Loading PDFs...</p>
            ) : myPdfs.length === 0 ? (
              <p className="courses-empty">No PDFs uploaded yet.</p>
            ) : (
              <div className="courses-list">
                {myPdfs.map(pdf => (
                  <div key={pdf.id} className="course-item">
                    <div className="course-info">
                      <span className="course-name">{pdf.name}</span>
                      <span className="course-category">{pdf.description ? pdf.description.substring(0, 50) : ''}</span>
                    </div>
                    {pdf.pdf_url && (
                      <a href={pdf.pdf_url} target="_blank" rel="noopener noreferrer" className="pdf-link" title="Open PDF">📄</a>
                    )}
                    <button
                      className="course-delete-btn"
                      onClick={() => handleDeletePdf(pdf.id)}
                      title="Delete PDF"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;

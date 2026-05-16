import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubidaCursos.css';
import { API } from '../api';

function SubidaCursos() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    status: 'pending',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024 * 1024) {
      setPopup({ show: true, message: 'The video must be smaller than 100MB', type: 'error' });
      setVideoFile(null);
      e.target.value = '';
      return;
    }
    setVideoFile(file);
  };

  const closePopup = () => setPopup({ show: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ show: false, message: '', type: '' });

    if (!videoFile) {
      setPopup({ show: true, message: 'Por favor selecciona un video', type: 'error' });
      setLoading(false);
      return;
    }

    if (videoFile.size > 100 * 1024 * 1024) {
      setPopup({ show: true, message: 'The video must be smaller than 100MB', type: 'error' });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('status', formData.status);
    data.append('video', videoFile);
    if (user && user.email) {
      data.append('author', user.email);
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(API.subidaCursos, {
        method: 'POST',
        body: data,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok) {
        const result = await response.json();
        setPopup({ show: true, message: 'Curso subido exitosamente', type: 'success' });
        setFormData({ name: '', description: '', category: '', status: 'pending' });
        setVideoFile(null);
        setTimeout(closePopup, 4000);
      } else {
        const errText = await response.text();
        try {
          const errData = JSON.parse(errText);
          const errMsg = errData.video || errData.message || errData.error || errData.detail || 'Error al subir el curso';
          setPopup({ show: true, message: typeof errMsg === 'object' ? Object.values(errMsg).flat().join(', ') : errMsg, type: 'error' });
        } catch {
          setPopup({ show: true, message: `Error del servidor (${response.status})`, type: 'error' });
        }
      }
    } catch (err) {
      const msg = err.name === 'AbortError' ? 'El servidor tardó demasiado. Verifica que el backend esté activo en Render.' : 'Error de conexión: ' + err.message;
      setPopup({ show: true, message: msg, type: 'error' });
    }

    setLoading(false);
  };

  return (
    <main className="subida-cursos-page">
      <div className="container subida-container">
        <div className="page-header">
          <div>
            <h1>Subir Curso</h1>
            <p className="subida-subtitle">Completa la información del curso y sube el video correspondiente</p>
          </div>
          <Link to="/apuntes-pdf" className="btn-ghost">Subir pdf</Link>
        </div>

        <form className="subida-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Nombre del curso</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ej: Introducción a React"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Ej: Programación"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending to Start</option>
                <option value="in_progress">In Progress</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe el contenido del curso..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Video del curso</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="video"
                accept="video/mp4,video/webm,video/ogg,video/mov,video/avi,video/mkv,video/*"
                onChange={handleFileChange}
                className="file-input"
              />
              {videoFile && (
                <div className="file-selected">
                  <span className="file-icon">🎬</span>
                  <span className="file-name">{videoFile.name}</span>
                  <span className="file-size">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <div className="author-info">
              Subiendo como: <strong>{user ? user.nombre : 'Invitado'}</strong>
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Subiendo...' : 'Subir curso'}
            </button>
          </div>
        </form>

        {popup.show && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className={`popup-card ${popup.type}`} onClick={(e) => e.stopPropagation()}>
              <span className="popup-icon">{popup.type === 'success' ? '✅' : '❌'}</span>
              <h3>{popup.type === 'success' ? '¡Curso subido!' : 'Error'}</h3>
              <p>{popup.message}</p>
              <button className="popup-btn" onClick={closePopup}>
                {popup.type === 'success' ? 'Genial' : 'Entendido'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default SubidaCursos;

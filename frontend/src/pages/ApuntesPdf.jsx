import { useState } from 'react';
import './ApuntesPdf.css';
import { API } from '../api';

function ApuntesPdf() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const closePopup = () => setPopup({ show: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ show: false, message: '', type: '' });

    if (!pdfFile) {
      setPopup({ show: true, message: 'Por favor selecciona un PDF', type: 'error' });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('pdf', pdfFile);
    if (user && user.email) {
      data.append('author', user.email);
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(API.apuntesPdf, {
        method: 'POST',
        body: data,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok) {
        const result = await response.json();
        setPopup({ show: true, message: 'PDF subido exitosamente', type: 'success' });
        setFormData({ name: '', description: '' });
        setPdfFile(null);
        setTimeout(closePopup, 4000);
      } else {
        const errText = await response.text();
        try {
          const errData = JSON.parse(errText);
          const errMsg = errData.pdf || errData.message || errData.error || errData.detail || 'Error al subir el PDF';
          setPopup({ show: true, message: typeof errMsg === 'object' ? Object.values(errMsg).flat().join(', ') : errMsg, type: 'error' });
        } catch {
          setPopup({ show: true, message: `Error del servidor (${response.status})`, type: 'error' });
        }
      }
    } catch (err) {
      const msg = err.name === 'AbortError' ? 'El servidor tardó demasiado. Verifica que el backend esté activo.' : 'Error de conexión: ' + err.message;
      setPopup({ show: true, message: msg, type: 'error' });
    }

    setLoading(false);
  };

  return (
    <main className="apuntes-pdf-page">
      <div className="container apuntes-container">
        <h1>Subir Apuntes PDF</h1>
        <p className="apuntes-subtitle">Completa la información y sube el archivo PDF correspondiente</p>

        <form className="apuntes-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del apunte</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej: Apuntes de Álgebra"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe el contenido del PDF..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Archivo PDF</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="pdf"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              {pdfFile && (
                <div className="file-selected">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{pdfFile.name}</span>
                  <span className="file-size">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <div className="author-info">
              Subiendo como: <strong>{user ? user.nombre : 'Invitado'}</strong>
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Subiendo...' : 'Subir PDF'}
            </button>
          </div>
        </form>

        {popup.show && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className={`popup-card ${popup.type}`} onClick={(e) => e.stopPropagation()}>
              <span className="popup-icon">{popup.type === 'success' ? '✅' : '❌'}</span>
              <h3>{popup.type === 'success' ? '¡PDF subido!' : 'Error'}</h3>
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

export default ApuntesPdf;

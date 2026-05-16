import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify({ nombre: data.nombre, email: formData.email, language: data.language || 'en' }));
        setUserName(data.nombre);
        setShowSuccess(true);
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <main className="container">
      <h2 style={{marginTop: '28px'}}>Entrar</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo</label>
        <input id="email" name="email" type="email" placeholder="tu@correo.com" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Contraseña</label>
        <input id="password" name="password" type="password" placeholder="••••••" value={formData.password} onChange={handleChange} required />
        <button className="submit" type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>

      {showSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Login Successful</h2>
            <p style={styles.modalText}>Welcome back, {userName}.</p>
            <div style={styles.buttonRow}>
              <button style={styles.btnSecondary} onClick={() => navigate("/landing")}>
                Go to Home
              </button>
              <button style={styles.btnPrimary} onClick={() => navigate("/profile")}>
                Go to My Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  modalContent: {
    background: "#fff",
    borderRadius: 16,
    padding: 32,
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
    color: "#2d2b3a",
  },
  modalText: {
    fontSize: 14,
    color: "#6b6890",
    marginBottom: 24,
    lineHeight: 1.6,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
  },
  btnSecondary: {
    padding: "10px 24px",
    borderRadius: 8,
    border: "1px solid #6b6890",
    background: "#fff",
    color: "#6b6890",
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
  },
  btnPrimary: {
    padding: "10px 24px",
    borderRadius: 8,
    border: "none",
    background: "#2d2b3a",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default Login;
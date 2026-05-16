import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    language: "es"
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.password) {
      alert("Por favor completa todos los campos");
      return;
    }
    try {
      const response = await fetch(API.registro, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify({ nombre: data.nombre, email: data.email, language: "es" }));
        setShowSuccess(true);
      } else {
        alert("Error al registrarse");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <h2 style={{ marginTop: '28px', textAlign: 'center' }}>Registro</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} required />

          <label htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" placeholder="tu@correo.com" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" placeholder="••••••" value={formData.password} onChange={handleChange} required />

          <button className="submit" type="submit">Crear cuenta</button>
        </form>
      </div>

      {showSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Registration Successful</h2>
            <p style={styles.modalText}>Tu cuenta ha sido creada correctamente.</p>
            <div style={styles.buttonRow}>
              <button style={styles.btnSecondary} onClick={() => navigate("/landing")}>
                Get Started
              </button>
              <button style={styles.btnPrimary} onClick={() => navigate("/profile")}>
                Go to My Account
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

export default Register;
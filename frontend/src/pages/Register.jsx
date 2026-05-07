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
        navigate("/profile");
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
    </main>
  );
}

export default Register;
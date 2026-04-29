import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert(`Bienvenido, ${data.nombre}`);
        navigate("/");
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
    </main>
  );
}

export default Login;
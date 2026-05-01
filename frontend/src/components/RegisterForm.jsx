import { useState } from "react";

function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("https://deploy-0-2test.onrender.com/api/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso ✅");
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.log(data);
        alert("Error al registrarse");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;
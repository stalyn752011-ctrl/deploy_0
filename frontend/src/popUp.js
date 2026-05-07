const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validación
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch('/api/registro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registro exitoso ✅");
            form.reset();
        } else {
            console.log(data);
            alert("Error al registrarse");
        }

    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor");
    }
});
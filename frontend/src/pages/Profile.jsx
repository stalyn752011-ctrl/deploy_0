function Profile() {
  return (
    <main className="container">
      <h2 style={{marginTop: '28px'}}>Mi Perfil</h2>
      <div className="card">
        <h3 id="user-name">Usuario</h3>
        <p id="user-coins">Monedas: 0</p>
      </div>
    </main>
  );
}

export default Profile;
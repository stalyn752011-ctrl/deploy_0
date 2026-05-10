import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <Hero />
      <Sessions />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="kicker center">Transforma tu scroll en aprendizaje</div>
        <h1 className="center">growly</h1>
        <p className="center">Aprende, Enseña, Crece — Una plataforma de intercambio de conocimientos donde cada sesión cuenta.</p>
        <div className="hero-ctas">
          <Link className="btn-primary" to="/register">Registrarse</Link>
          <Link className="btn-ghost" to="/login">Login</Link>
        </div>
      </div>
    </section>
  );
}

function Sessions() {
  return (
    <section className="container">
      <h2 style={{marginTop: '18px'}}>Sesiones disponibles</h2>
      <div className="grid" id="sessions-list">
        <div className="card session-card">
          <div className="session-avatar">CR</div>
          <div className="session-meta">
            <div className="session-top"><strong>Carlos Ruiz</strong> <span style={{color: '#f0b429'}}>★ 4.9</span></div>
            <div className="session-title">Introducción a React para principiantes</div>
            <div className="session-sub">40 minutos · Online</div>
            <div className="session-info"><div className="coins">25</div></div>
          </div>
        </div>

        <div className="card session-card">
          <div className="session-avatar">SR</div>
          <div className="session-meta">
            <div className="session-top"><strong>Sofía Romano</strong> <span style={{color: '#f0b429'}}>★ 5</span></div>
            <div className="session-title">Cocina italiana: Pasta casera perfecta</div>
            <div className="session-sub">30 minutos · Presencial</div>
            <div className="session-info"><div className="coins">20</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
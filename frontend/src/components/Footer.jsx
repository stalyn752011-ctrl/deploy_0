import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <h4>Growly</h4>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul>
            <li><a href="mailto:soporte@growly.app">soporte@growly.app</a></li>
            <li><a href="https://twitter.com/growly" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://github.com/growly" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
        <div className="footer-col footer-copy">
          <small>© 2026 Growly — Grupo 16</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
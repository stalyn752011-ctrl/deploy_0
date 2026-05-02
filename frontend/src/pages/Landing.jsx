import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <main className="landing-page">
      <LandingHero />
      <TrustedPartners />
      <AboutSection />
      <CategoriesSection />
      <CTASection />
    </main>
  );
}

function LandingHero() {
  return (
    <section className="landing-hero">
      <div className="hero-wave hero-wave-1" />
      <div className="hero-wave hero-wave-2" />
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">🚀 Nueva plataforma 2025</span>
          <h1>
            Learn Web Development through<br />
            <span className="gradient-text">Live Online Classrooms</span>
          </h1>
          <p className="hero-subtitle">
            Master HTML, CSS, JavaScript and more with expert instructors in real-time.
            Join thousands of students building their future today.
          </p>
          <div className="hero-actions">
            <Link className="btn-cta" to="/register">
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button className="btn-demo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Watch Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Active Students</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Expert Mentors</span>
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-main">
            <div className="laptop-screen">
              <div className="code-editor">
                <div className="editor-header">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="editor-title">app.jsx</span>
                </div>
                <div className="editor-content">
                  <code>
                    <span className="code-keyword">const</span> <span className="code-func">Learning</span> = () =&gt; {'{'}<br />
                    &nbsp;&nbsp;<span className="code-keyword">return</span> (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">div</span> className=<span className="code-string">"classroom"</span>&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">h1</span>&gt;Hello World!&lt;/<span className="code-tag">h1</span>&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="code-tag">div</span>&gt;<br />
                    &nbsp;&nbsp;);<br />
                    {'}'};
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-card card-live">
            <div className="card-icon live-icon">🔴</div>
            <div className="card-text">
              <span className="card-title">Live Class</span>
              <span className="card-sub">React Basics</span>
            </div>
          </div>
          <div className="floating-card card-students">
            <div className="avatar-stack">
              <span className="mini-avatar a1">A</span>
              <span className="mini-avatar a2">B</span>
              <span className="mini-avatar a3">C</span>
            </div>
            <div className="card-text">
              <span className="card-title">+1,240</span>
              <span className="card-sub">Students online</span>
            </div>
          </div>
          <div className="floating-card card-certificate">
            <div className="card-icon cert-icon">🎓</div>
            <div className="card-text">
              <span className="card-title">Certificate</span>
              <span className="card-sub">Earned!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedPartners() {
  const partners = ['Udemy', 'Slack', 'Treehouse', 'GitHub', 'Vercel', 'Netlify'];

  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-label">Trusted by Awesome Partners</p>
        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner} className="partner-logo">{partner}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section">
      <div className="container about-container">
        <div className="about-content">
          <span className="section-badge">About Growly</span>
          <h2>The #1 Platform for<br />Interactive Learning</h2>
          <p className="about-description">
            We connect passionate learners with expert instructors in live, interactive classrooms.
            Our platform makes it easy to learn web development through hands-on projects,
            real-time feedback, and a supportive community.
          </p>
          <ul className="about-features">
            <li>
              <span className="feature-icon">✓</span>
              <span>Live interactive sessions with expert mentors</span>
            </li>
            <li>
              <span className="feature-icon">✓</span>
              <span>Project-based learning with real-world examples</span>
            </li>
            <li>
              <span className="feature-icon">✓</span>
              <span>Certificates upon completion of each course</span>
            </li>
            <li>
              <span className="feature-icon">✓</span>
              <span>24/7 community support and discussion forums</span>
            </li>
          </ul>
          <Link className="btn-outline" to="/register">Learn More About Us</Link>
        </div>
        <div className="about-visual">
          <div className="about-image">
            <div className="person-working">
              <div className="person-head" />
              <div className="person-body" />
              <div className="person-laptop">
                <div className="laptop-screen-small" />
              </div>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-card-number">4M+</span>
              <span className="stat-card-label">Students</span>
            </div>
            <div className="stat-card">
              <span className="stat-card-number">75k+</span>
              <span className="stat-card-label">Courses</span>
            </div>
            <div className="stat-card">
              <span className="stat-card-number">250+</span>
              <span className="stat-card-label">Free Courses</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const categories = [
    {
      title: 'HTML Fundamentals',
      description: 'Build the structure of web pages with semantic HTML5 elements.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      lessons: '24 lessons',
      color: '#ff6b35',
    },
    {
      title: 'CSS Mastery',
      description: 'Style beautiful, responsive layouts with modern CSS techniques.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
          <path d="M18 24h12M24 18v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      lessons: '32 lessons',
      color: '#7b2cff',
    },
    {
      title: 'JavaScript Pro',
      description: 'Master ES6+, async programming, and DOM manipulation.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M14 34l8-20 8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      lessons: '48 lessons',
      color: '#00c9a7',
    },
    {
      title: 'React Essentials',
      description: 'Build dynamic UIs with components, hooks, and state management.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2" transform="rotate(120 24 24)" />
        </svg>
      ),
      lessons: '36 lessons',
      color: '#61dafb',
    },
    {
      title: 'Node.js Backend',
      description: 'Create RESTful APIs and server-side applications with Node.js.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 8l14 8v16l-14 8-14-8V16l14-8z" stroke="currentColor" strokeWidth="2" />
          <path d="M24 24v16M24 24L10 16M24 24l14-8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      lessons: '40 lessons',
      color: '#68a063',
    },
    {
      title: 'UI/UX Design',
      description: 'Learn design principles, wireframing, and prototyping tools.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="26" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="10" y="26" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="26" y="26" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      lessons: '28 lessons',
      color: '#ff4081',
    },
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Browse Courses</span>
          <h2>Explore Popular Categories</h2>
          <p className="section-subtitle">
            Choose from hundreds of courses designed by industry experts
          </p>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.title} className="category-card">
              <div className="category-icon" style={{ color: cat.color }}>
                {cat.icon}
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <div className="category-footer">
                <span className="category-lessons">{cat.lessons}</span>
                <Link className="category-link" to="/register" style={{ color: cat.color }}>
                  Enroll Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already building their future with Growly.</p>
          <div className="cta-actions">
            <Link className="btn-cta btn-cta-white" to="/register">
              Create Free Account
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link className="btn-ghost-white" to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;

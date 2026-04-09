import { BookWall } from './components/BookWall';
import { UploadCard } from './components/UploadCard';
import './App.css';

export default function App() {
  return (
    <div className="app">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span className="logo-dot" />
            <span className="logo-text">UIsense</span>
          </a>
          <div className="nav-links">
            <a href="#how" className="nav-link">How it works</a>
            <a href="#" className="nav-cta">Get started</a>
          </div>
        </div>
      </nav>

      {/* Hero — books fill viewport, card floats center */}
      <section className="hero">
        <BookWall />
        <div className="hero-center">
          <UploadCard />
          <p className="hero-footnote">
            Backed by 74 principles · 30 patterns · 89 tokens from real design books
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how">
        <h2>How it works</h2>
        <div className="steps-grid">
          {[
            { n: '01', icon: '📸', title: 'Upload', desc: 'Take a screenshot of any website or paste a URL.' },
            { n: '02', icon: '📚', title: 'AI reads the books', desc: '74 design principles from real books are consulted in seconds.' },
            { n: '03', icon: '✨', title: 'Get your redesign', desc: 'Scored audit with cited findings and an improved version of your page.' },
          ].map((s) => (
            <div key={s.n} className="step-card">
              <span className="step-number">{s.n}</span>
              <span className="step-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        Built for the Lovable Hackathon · Powered by{' '}
        <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer">Claude</a>
        {' '}+ uiux MCP
      </footer>
    </div>
  );
}

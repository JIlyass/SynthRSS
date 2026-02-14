import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 6}s`,
  size: `${3 + Math.random() * 4}px`,
}));

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero-bg-pattern"></div>

      {/* Animated particles */}
      <div className="hero-particles">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-badge">
          <i className="fa fa-bolt" style={{ marginRight: 6 }}></i>
          AI-Powered Research Summaries
        </div>

        <h1>
          Stay Updated<br />
          <span>Without Reading</span><br />
          Everything
        </h1>

        <p className="hero-subtitle">
          Receive concise AI-generated summaries of the latest articles<br />
          in your favorite domains — delivered automatically.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="btn btn-danger">
            Get Started &nbsp;<i className="fa fa-arrow-right"></i>
          </Link>
          <button
            className="btn btn-outline"
            onClick={() => scrollTo('how-it-works')}
          >
            How It Works
          </button>
        </div>

        {/* RSS → AI → User flow visualization */}
        <div className="hero-flow">
          <div className="flow-item">
            <div className="flow-icon">📡</div>
            <span className="flow-label">RSS Sources</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">🤖</div>
            <span className="flow-label">AI Analysis</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">📄</div>
            <span className="flow-label">Summary</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">🔔</div>
            <span className="flow-label">Your Inbox</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

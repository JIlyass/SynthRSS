import React from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CTA = () => {
  const ref = useScrollAnimation();

  return (
    <section
      id="cta"
      className="cta-section"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1515 50%, #0f3460 100%)',
      }}
    >
      <div className="container" ref={ref}>
        <div className="cta-content fade-in-up">
          <i className="fa fa-robot"></i>
          <h2>Let AI Read For You</h2>
          <p>
            Stop drowning in papers and articles. BrieflyAI does the reading so you can focus 
            on what actually matters — applying knowledge, not hunting for it.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-danger">
              Get Started Free &nbsp;<i className="fa fa-arrow-right"></i>
            </Link>
            <a href="#features" className="btn btn-outline"
              onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Explore Features
            </a>
          </div>
        </div>
      </div>
      <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
    </section>
  );
};

export default CTA;

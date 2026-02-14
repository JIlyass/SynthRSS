import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const techStack = [
  { icon: '⚙️', name: 'n8n', desc: 'Automation' },
  { icon: '🚀', name: 'FastAPI', desc: 'Backend' },
  { icon: '🐘', name: 'PostgreSQL', desc: 'Database' },
  { icon: '🤗', name: 'Hugging Face', desc: 'NLP Models' },
  { icon: '📡', name: 'RSS Feeds', desc: 'Data Sources' },
  { icon: '🔷', name: 'BART / T5', desc: 'Summarization' },
];

const TechStack = () => {
  const ref = useScrollAnimation();

  return (
    <section id="tech-stack" className="tech-stack">
      <div className="container" ref={ref}>
        <div className="head_title center m-y-3">
          <h2 className="fade-in-up">Tech Stack</h2>
          <p className="fade-in-up">
            Built with modern, production-grade technologies for reliability, 
            scalability, and accuracy.
          </p>
        </div>

        <div className="tech-grid">
          {techStack.map((t, i) => (
            <div
              key={i}
              className="tech-item fade-in-up"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="tech-item-icon">{t.icon}</div>
              <div className="tech-item-name">{t.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
};

export default TechStack;

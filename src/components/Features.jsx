import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const features = [
  {
    icon: 'fa-magic',
    title: 'AI-Powered Summaries',
    desc: 'Advanced NLP models condense lengthy research papers into 2-minute reads without losing critical information.',
  },
  {
    icon: 'fa-sliders',
    title: 'Personalized Topics',
    desc: 'Select from 20+ research domains. Your feed is curated to match your professional and intellectual interests.',
  },
  {
    icon: 'fa-robot',
    title: 'Fully Automated Agents',
    desc: 'Intelligent n8n-powered agents handle the entire pipeline autonomously — discovery, extraction, summarization, and delivery.',
  },
  {
    icon: 'fa-bolt',
    title: 'Real-Time Updates',
    desc: 'New articles are processed and summarized within minutes of publication. Stay on the cutting edge, always.',
  },
  {
    icon: 'fa-database',
    title: 'Multi-Source Aggregation',
    desc: 'Aggregate content from PubMed, arXiv, Nature, IEEE, TechCrunch, MIT News and hundreds more trusted sources.',
  },
  {
    icon: 'fa-envelope-o',
    title: 'Smart Digest Delivery',
    desc: 'Receive daily or weekly email digests customized by frequency, domain, and reading-time preference.',
  },
];

const Features = () => {
  const ref = useScrollAnimation();

  return (
    <section id="features" className="features">
      <div className="container" ref={ref}>
        <div className="head_title center m-y-3">
          <h2 className="fade-in-up">Features</h2>
          <p className="fade-in-up">
            Everything you need to stay at the forefront of your field — 
            without sacrificing hours of your day.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card zoom-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="feature-card-icon">
                <i className={`fa ${f.icon}`}></i>
              </div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
};

export default Features;

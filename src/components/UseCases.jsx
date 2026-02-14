import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const useCases = [
  {
    icon: 'fa-flask',
    title: 'Researchers',
    desc: 'Track publications in your field without reading full papers. Identify relevant studies faster and stay ahead of emerging trends.',
  },
  {
    icon: 'fa-graduation-cap',
    title: 'Students',
    desc: 'Keep up with the latest academic developments during busy exam periods. Build domain knowledge effortlessly with daily summaries.',
  },
  {
    icon: 'fa-briefcase',
    title: 'Professionals',
    desc: 'Stay informed about industry trends, technical advances, and competitor innovations — without sacrificing productive work hours.',
  },
  {
    icon: 'fa-lightbulb-o',
    title: 'Tech Enthusiasts',
    desc: 'Explore the frontiers of AI, biotech, and emerging technologies through curated, digestible daily briefings.',
  },
];

const UseCases = () => {
  const ref = useScrollAnimation();

  return (
    <section id="use-cases" className="use-cases">
      <div className="container" ref={ref}>
        <div className="head_title center m-y-3">
          <h2 className="fade-in-up">Who It's For</h2>
          <p className="fade-in-up">
            BrieflyAI serves anyone who needs to stay informed across rapidly 
            evolving fields — without the cognitive overload.
          </p>
        </div>

        <div className="use-cases-grid">
          {useCases.map((u, i) => (
            <div
              key={i}
              className="use-case-card zoom-in"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="use-case-icon">
                <i className={`fa ${u.icon}`}></i>
              </div>
              <h3>{u.title}</h3>
              <p>{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
};

export default UseCases;

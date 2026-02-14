import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const problems = [
  {
    icon: 'fa-newspaper-o',
    title: 'Information Overload',
    description:
      'Thousands of new scientific and tech articles are published every day. It\'s impossible to keep up with all relevant publications across multiple domains.',
  },
  {
    icon: 'fa-clock-o',
    title: 'Too Many Articles, Too Little Time',
    description:
      'Reading a single research paper can take 30–60 minutes. Professionals and students simply cannot afford to read everything that matters.',
  },
  {
    icon: 'fa-bell-slash-o',
    title: 'Missing Critical Updates',
    description:
      'Without a smart filtering system, important breakthroughs and discoveries in AI, Medicine, or Biology go unnoticed — right when they matter most.',
  },
];

const Problem = () => {
  const ref = useScrollAnimation();

  return (
    <section id="problem" className="problem">
      <div className="container" ref={ref}>
        <div className="head_title center m-y-3">
          <h2 className="fade-in-up">The Problem We Solve</h2>
          <p className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            Researchers, students, and professionals are drowning in content — 
            and the flood is only getting worse.
          </p>
        </div>

        <div className="problem-cards">
          {problems.map((p, i) => (
            <div
              key={i}
              className="problem-card fade-in-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="problem-card-icon">
                <i className={`fa ${p.icon}`}></i>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
};

export default Problem;

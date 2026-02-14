import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const steps = [
  {
    number: 1,
    icon: '📡',
    title: 'RSS Sources',
    desc: 'Trusted feeds from journals, blogs & preprints are monitored 24/7',
  },
  {
    number: 2,
    icon: '📝',
    title: 'Text Extraction',
    desc: 'Full article content is fetched and cleaned for processing',
  },
  {
    number: 3,
    icon: '🤖',
    title: 'AI Summarization',
    desc: 'BART/T5 Transformer models generate concise, accurate summaries',
  },
  {
    number: 4,
    icon: '🗄️',
    title: 'Database',
    desc: 'Summaries stored in PostgreSQL with metadata and topic tags',
  },
  {
    number: 5,
    icon: '🔔',
    title: 'Personalized Notifications',
    desc: 'Tailored digest delivered to users based on their interests',
  },
];

const HowItWorks = () => {
  const ref = useScrollAnimation();

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container" ref={ref}>
        <div className="head_title center m-y-3">
          <h2 className="fade-in-up">How It Works</h2>
          <p className="fade-in-up">
            A fully automated, intelligent pipeline that runs continuously in the background — 
            five steps from raw data to your personalized briefing.
          </p>
        </div>

        <div className="steps-flow">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="step-item fade-in-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="step-number">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginTop: '4rem' }} />
    </section>
  );
};

export default HowItWorks;

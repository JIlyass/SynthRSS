import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const solutions = [
  {
    icon: 'fa-rss',
    title: 'Automatic RSS Collection',
    description:
      'BrieflyAI continuously monitors hundreds of trusted RSS feeds from journals, preprint servers, and tech blogs — no manual curation needed.',
  },
  {
    icon: 'fa-file-text-o',
    title: 'Full Text Extraction',
    description:
      'Our intelligent crawlers extract the full content of each article, going beyond abstract-only summaries for deeper, more accurate analysis.',
  },
  {
    icon: 'fa-magic',
    title: 'AI Summarization',
    description:
      'State-of-the-art Transformer models (BART/T5) distill complex scientific content into clear, concise summaries you can read in under 2 minutes.',
  },
  {
    icon: 'fa-user-circle-o',
    title: 'Personalized Delivery',
    description:
      'Choose your domains of interest — AI, Medicine, Biology, Physics and more. Receive tailored digests directly in your inbox on your schedule.',
  },
];

const Solution = () => {
  const ref = useScrollAnimation();

  return (
    <section id="solution" className="solution">
      <div className="container" ref={ref}>
        <div className="head_title center m-y-3">
          <h2 className="fade-in-up">Our Solution</h2>
          <p className="fade-in-up">
            BrieflyAI automates the entire pipeline — from discovery to delivery — 
            so you always stay informed without the overwhelm.
          </p>
        </div>

        <div className="solution-grid">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`solution-item ${i % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="solution-item-icon">
                <i className={`fa ${s.icon}`}></i>
              </div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
};

export default Solution;

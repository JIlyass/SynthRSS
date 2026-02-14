import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/* Footer */}
      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand column */}
            <div className="footer-brand">
              <div className="brand-name">
                Briefly<span>AI</span>
              </div>
              <p>
                BrieflyAI is a modern SaaS platform for automatic summarization of scientific 
                and tech articles. Stay informed, stay sharp — without the reading overload.
              </p>
              <div className="social-links">
                {['twitter', 'linkedin', 'github', 'rss'].map(s => (
                  <a key={s} href="#!">
                    <i className={`fa fa-${s}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Features column */}
            <div className="footer-col">
              <h4>Features</h4>
              <ul>
                {[
                  'AI-Powered Summaries',
                  'Personalized Topics',
                  'Automated Agents',
                  'Real-Time Updates',
                  'Multi-Source Aggregation',
                ].map((item, i) => (
                  <li key={i}>
                    <i className="fa fa-check"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags column */}
            <div className="footer-col">
              <h4>Topics</h4>
              <div className="footer-tags">
                {['AI', 'Medicine', 'Biology', 'Physics', 'ML', 'NLP', 'Biotech', 'Climate'].map(tag => (
                  <a key={tag} href="#!">{tag}</a>
                ))}
              </div>
            </div>

            {/* Links column */}
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><i className="fa fa-info-circle"></i> About</li>
                <li><i className="fa fa-file-text-o"></i> Blog</li>
                <li><i className="fa fa-shield"></i> Privacy Policy</li>
                <li><i className="fa fa-file-o"></i> Terms of Service</li>
                <li>
                  <i className="fa fa-sign-in"></i>
                  <Link to="/login" style={{ color: '#ec4848' }}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="main_coppyright">
          <div className="container">
            <div className="footer-copyright">
              <p>
                Made with <i className="fa fa-heart"></i> by{' '}
                <a href="#!">BrieflyAI Team</a> © {new Date().getFullYear()}. All Rights Reserved.
              </p>
              <div className="social-copy">
                {['twitter', 'linkedin', 'github', 'rss', 'envelope-o'].map(s => (
                  <a key={s} href="#!">
                    <i className={`fa fa-${s}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

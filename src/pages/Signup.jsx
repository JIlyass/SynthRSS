import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRegister, extractApiError } from '../services/api';

/* ─── Available interest options ─── */
const INTEREST_OPTIONS = [
  'Artificial Intelligence', 'Machine Learning', 'Technology', 'Medicine',
  'Biology', 'Health', 'Science', 'Physics', 'Climate', 'Biotech',
  'NLP', 'Robotics', 'Space', 'Sport', 'Psychology',
];

/* ─── Password strength helper ─── */
const getPasswordStrength = (pw) => {
  if (!pw) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)        score++;
  if (pw.length >= 12)       score++;
  if (/[A-Z]/.test(pw))     score++;
  if (/[0-9]/.test(pw))     score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: 'Weak',   color: '#e74c3c' };
  if (score <= 3) return { level: 2, label: 'Fair',   color: '#f39c12' };
  if (score === 4) return { level: 3, label: 'Good',  color: '#2ecc71' };
  return                    { level: 4, label: 'Strong', color: '#27ae60' };
};

const Signup = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: false,
  });
  const [interests, setInterests]       = useState([]);
  const [errors, setErrors]             = useState({});
  const [apiError, setApiError]         = useState('');
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const dropdownRef = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setDropdownSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const addInterest = (item) => {
    if (!interests.includes(item)) {
      setInterests(prev => [...prev, item]);
      if (errors.interests) setErrors(prev => ({ ...prev, interests: '' }));
    }
    setDropdownSearch('');
    setDropdownOpen(false);
  };

  const removeInterest = (item) => setInterests(prev => prev.filter(i => i !== item));

  const filteredOptions = INTEREST_OPTIONS.filter(
    o => !interests.includes(o) && o.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  /* ── Validation ── */
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim())          errs.fullName = 'Full name is required.';
    else if (form.fullName.trim().length < 2) errs.fullName = 'Name must be at least 2 characters.';
    if (!form.email)                    errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.';
    if (!form.password)                 errs.password = 'Password is required.';
    else if (form.password.length < 8)  errs.password = 'Password must be at least 8 characters.';
    if (!form.confirmPassword)          errs.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    if (interests.length === 0)         errs.interests = 'Please select at least one area of interest.';
    if (!form.agreeTerms)               errs.agreeTerms = 'You must accept the Terms of Service to continue.';
    return errs;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErr = document.querySelector('.field-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setApiError('');

    const { ok, status, data } = await apiRegister({
      full_name: form.fullName.trim(),
      email:     form.email,
      password:  form.password,
      interests: interests,
    });

    setLoading(false);

    if (ok) {
      setSuccess(true);
      return;
    }

    // Map HTTP errors to user-friendly messages
    if (status === 409) {
      setErrors(prev => ({
        ...prev,
        email: 'An account with this email already exists.',
      }));
    } else {
      setApiError(extractApiError(data));
    }
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className="login-page signup-page">
      {/* ═══ Left panel ═══ */}
      <div className="login-left">
        <Link to="/" className="login-back">
          <i className="fa fa-arrow-left"></i> Back to Home
        </Link>
        <div className="login-left-content">
          <div className="login-brand">Briefly<span>AI</span></div>
          <p className="login-tagline">
            Join thousands of researchers, students and professionals
            who let AI do the reading for them.
          </p>
          <ul className="login-feature-list">
            <li><i className="fa fa-check-circle"></i> Free to get started — no credit card needed</li>
            <li><i className="fa fa-check-circle"></i> Personalized to your research domains</li>
            <li><i className="fa fa-check-circle"></i> Daily AI-curated digest in your inbox</li>
            <li><i className="fa fa-check-circle"></i> Summaries from arXiv, PubMed, IEEE &amp; more</li>
            <li><i className="fa fa-check-circle"></i> Powered by BART &amp; T5 Transformers</li>
          </ul>
          <div className="signup-stats">
            <div className="signup-stat">
              <span className="signup-stat-num">12K+</span>
              <span className="signup-stat-label">Active users</span>
            </div>
            <div className="signup-stat">
              <span className="signup-stat-num">200+</span>
              <span className="signup-stat-label">RSS sources</span>
            </div>
            <div className="signup-stat">
              <span className="signup-stat-num">98%</span>
              <span className="signup-stat-label">Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Right panel ═══ */}
      <div className="login-right signup-right">
        <div className="login-form-container signup-form-container">

          <div className="login-form-header">
            <h2>Create your account</h2>
            <p>Start receiving AI-powered research summaries today</p>
          </div>

          {/* API-level error */}
          {apiError && !success && (
            <div className="login-error">
              <i className="fa fa-exclamation-circle"></i>
              {apiError}
            </div>
          )}

          {/* Success state */}
          {success && (
            <div className="login-success signup-success-banner">
              <i className="fa fa-check-circle"></i>
              <div>
                <strong>Account created successfully!</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', opacity: 0.85 }}>
                  Welcome to BrieflyAI, {form.fullName.split(' ')[0]}!
                  You can now log in.
                </p>
              </div>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-wrapper">
                  <input
                    id="fullName" type="text" name="fullName"
                    placeholder="Jane Doe" value={form.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'input-error' : ''}
                    autoComplete="name" autoFocus
                  />
                  <i className="fa fa-user-o input-icon"></i>
                </div>
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="signup-email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    id="signup-email" type="email" name="email"
                    placeholder="you@example.com" value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                    autoComplete="email"
                  />
                  <i className="fa fa-envelope-o input-icon"></i>
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="input-wrapper">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password" placeholder="Min. 8 characters"
                    value={form.password} onChange={handleChange}
                    className={errors.password ? 'input-error' : ''}
                    autoComplete="new-password"
                  />
                  <i className="fa fa-lock input-icon"></i>
                  <button type="button" className="pw-toggle"
                    onClick={() => setShowPassword(v => !v)} tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    <i className={`fa fa-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="pw-strength">
                    <div className="pw-strength-bars">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="pw-strength-bar"
                          style={{ background: n <= strength.level ? strength.color : '#e0e0e0', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                    <span className="pw-strength-label" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                )}
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword" type="password" name="confirmPassword"
                    placeholder="Repeat your password" value={form.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    autoComplete="new-password"
                  />
                  <i className="fa fa-lock input-icon"></i>
                  {form.confirmPassword.length > 0 && (
                    <i
                      className={`fa fa-${form.password === form.confirmPassword ? 'check-circle' : 'times-circle'} pw-match-icon`}
                      style={{ color: form.password === form.confirmPassword ? '#27ae60' : '#e74c3c' }}
                    ></i>
                  )}
                </div>
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>

              {/* Areas of Interest */}
              <div className="form-group">
                <label>Areas of Interest</label>
                <div
                  className={`interests-container${errors.interests ? ' interests-error' : ''}`}
                  ref={dropdownRef}
                >
                  <div className="interests-badges-area">
                    {interests.map(item => (
                      <span key={item} className="interest-badge">
                        {item}
                        <button type="button" className="interest-badge-remove"
                          onClick={() => removeInterest(item)} aria-label={`Remove ${item}`}>
                          <i className="fa fa-times"></i>
                        </button>
                      </span>
                    ))}
                    <button type="button" className="interests-add-btn"
                      onClick={() => setDropdownOpen(v => !v)}>
                      <i className="fa fa-plus"></i>
                      {interests.length === 0 ? 'Select topics…' : 'Add more'}
                    </button>
                  </div>

                  {dropdownOpen && (
                    <div className="interests-dropdown">
                      <div className="interests-search-wrapper">
                        <i className="fa fa-search"></i>
                        <input type="text" className="interests-search"
                          placeholder="Search topics…" value={dropdownSearch}
                          onChange={e => setDropdownSearch(e.target.value)} autoFocus />
                      </div>
                      <ul className="interests-dropdown-list">
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map(opt => (
                            <li key={opt} className="interests-dropdown-item" onClick={() => addInterest(opt)}>
                              <i className="fa fa-plus-circle"></i>{opt}
                            </li>
                          ))
                        ) : (
                          <li className="interests-dropdown-empty">
                            {INTEREST_OPTIONS.filter(o => !interests.includes(o)).length === 0
                              ? '✓ All topics selected' : 'No matching topics'}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {errors.interests && <span className="field-error">{errors.interests}</span>}
                {interests.length > 0 && (
                  <span className="interests-count">
                    <i className="fa fa-check-circle" style={{ color: '#27ae60', marginRight: 4 }}></i>
                    {interests.length} topic{interests.length > 1 ? 's' : ''} selected
                  </span>
                )}
              </div>

              {/* Terms */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-check" style={{ alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="agreeTerms" checked={form.agreeTerms}
                    onChange={handleChange} style={{ marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>
                    I agree to the{' '}
                    <a href="#!" className="forgot-link" onClick={e => e.preventDefault()}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="#!" className="forgot-link" onClick={e => e.preventDefault()}>Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className="field-error" style={{ marginTop: '0.3rem' }}>{errors.agreeTerms}</span>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                  <><i className="fa fa-spinner fa-spin" style={{ marginRight: 8 }}></i>Creating account…</>
                ) : (
                  <>Create Account &nbsp;<i className="fa fa-user-plus"></i></>
                )}
              </button>

              <div className="login-divider">or</div>

              <p className="login-footer-text">
                Already have an account?{' '}
                <Link to="/login">Login</Link>
              </p>
            </form>
          )}

          {success && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/login" className="btn-login"
                style={{ display: 'inline-block', width: 'auto', padding: '0.9rem 2.5rem' }}>
                Go to Login &nbsp;<i className="fa fa-sign-in"></i>
              </Link>
              <p className="login-footer-text" style={{ marginTop: '1rem' }}>
                <Link to="/">← Back to Home</Link>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Signup;

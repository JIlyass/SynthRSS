import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin, extractApiError } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm]         = useState({ email: '', password: '', remember: false });
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  // ── Frontend validation ────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.email) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setApiError('');

    const { ok, status, data } = await apiLogin({
      email:    form.email,
      password: form.password,
    });

    setLoading(false);

    if (ok) {
      // Token is auto-stored by apiLogin(); show success then redirect
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
      return;
    }

    // Map HTTP status to user-friendly messages
    if (status === 401) {
      setApiError('Incorrect email or password. Please try again.');
    } else if (status === 403) {
      setApiError('Your account has been deactivated. Please contact support.');
    } else {
      setApiError(extractApiError(data));
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="login-left">
        <Link to="/" className="login-back">
          <i className="fa fa-arrow-left"></i> Back to Home
        </Link>

        <div className="login-left-content">
          <div className="login-brand">
            Briefly<span>AI</span>
          </div>
          <p className="login-tagline">
            Your intelligent research companion. Stay updated on what matters —
            automatically, every single day.
          </p>

          <ul className="login-feature-list">
            <li><i className="fa fa-check-circle"></i> AI-powered summaries of latest research</li>
            <li><i className="fa fa-check-circle"></i> Personalized by your domains of interest</li>
            <li><i className="fa fa-check-circle"></i> Automated delivery to your inbox</li>
            <li><i className="fa fa-check-circle"></i> Multi-source aggregation (arXiv, PubMed, IEEE...)</li>
            <li><i className="fa fa-check-circle"></i> Powered by BART &amp; T5 Transformers</li>
          </ul>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your BrieflyAI account</p>
          </div>

          {success && (
            <div className="login-success">
              <i className="fa fa-check-circle" style={{ marginRight: 8 }}></i>
              Login successful! Redirecting to home…
            </div>
          )}

          {apiError && !success && (
            <div className="login-error">
              <i className="fa fa-exclamation-circle"></i>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                  autoComplete="email"
                />
                <i className="fa fa-envelope-o input-icon"></i>
              </div>
              {errors.email && (
                <span style={{ color: '#c0392b', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete="current-password"
                />
                <i className="fa fa-lock input-icon"></i>
              </div>
              {errors.password && (
                <span style={{ color: '#c0392b', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="form-check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <a href="#!" className="forgot-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-login" disabled={loading || success}>
              {loading ? (
                <><i className="fa fa-spinner fa-spin" style={{ marginRight: 8 }}></i>Signing in…</>
              ) : (
                <>Login &nbsp;<i className="fa fa-sign-in"></i></>
              )}
            </button>

            <div className="login-divider">or</div>

            <p className="login-footer-text">
              Don't have an account?{' '}
              <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

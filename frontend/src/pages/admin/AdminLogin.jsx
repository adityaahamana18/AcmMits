import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await login(username, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 position-relative overflow-hidden cyber-grid-bg">
      <div className="radial-glow-top"></div>

      <div className="acm-card p-4 p-sm-5 w-100 shadow-lg position-relative z-1" style={{ maxWidth: '440px' }}>
        <div className="text-center mb-4">
          <div 
            className="p-1 rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
            style={{ background: 'linear-gradient(135deg, #2563eb, #38bdf8)', width: '50px', height: '50px' }}
          >
            <i className="bi bi-shield-lock-fill text-white fs-3"></i>
          </div>
          <h3 className="text-white font-heading fw-bold mb-1">Admin Portal</h3>
          <p className="text-secondary small mb-0">MITS ACM STUDENT CHAPTER</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3 small">
          <div>
            <label className="form-label text-secondary small fw-bold text-uppercase mb-1">Username / Email</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary border-opacity-50 text-secondary">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control bg-dark border-secondary border-opacity-50 text-light shadow-none"
              />
            </div>
          </div>

          <div>
            <label className="form-label text-secondary small fw-bold text-uppercase mb-1">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary border-opacity-50 text-secondary">
                <i className="bi bi-key"></i>
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="form-control bg-dark border-secondary border-opacity-50 text-light shadow-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-acm-primary w-100 mt-2 py-2"
          >
            {submitting ? 'Verifying...' : 'Sign In'} <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </form>

        <div className="pt-4 mt-4 border-top border-secondary border-opacity-25 text-center">
          <span className="text-secondary opacity-75" style={{ fontSize: '0.75rem' }}>
            Default test credentials:<br />
            Username: <code className="text-info">admin</code> | Password: <code className="text-info">Admin@ACMMits2025!</code>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

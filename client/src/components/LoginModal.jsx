import React, { useState } from 'react';

function LoginModal({ onLogin, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'siam-admin-2026') {
      onLogin();
    } else {
      setError('Incorrect password.');
      setPassword('');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Enter password"
          />
          {error && <p className="modal-error">{error}</p>}
          <button type="submit">Log In</button>
        </form>
        <button className="modal-cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default LoginModal;
